import { useEffect, useMemo, useState } from "react";
import { Upload } from "lucide-react";
import {
  calculatePrintTotal,
  getPrintUnitPrice,
  submitPrintRequest,
} from "../../../services/print";
import type { PrintColorMode } from "../../../services/print";

export default function PrintRequestForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [colorMode, setColorMode] = useState<PrintColorMode>("black-and-white");
  const [ownPaper, setOwnPaper] = useState(false);
  const [note, setNote] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(
    () => calculatePrintTotal(quantity, colorMode, ownPaper, urgent),
    [quantity, colorMode, ownPaper, urgent]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }

    setStatus(null);
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl(null);
    setStatus(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!file) {
      setStatus({ type: "error", message: "Please choose a file to upload." });
      return;
    }

    if (quantity < 1) {
      setStatus({
        type: "error",
        message: "Quantity must be at least 1 copy.",
      });
      return;
    }

    setLoading(true);

    try {
      await submitPrintRequest({
        file,
        quantity,
        colorMode,
        ownPaper,
        urgent,
        note,
      });

      setStatus({
        type: "success",
        message:
          "Print request submitted! Your request is now pending processing.",
      });
      setFile(null);
      setQuantity(1);
      setColorMode("black-and-white");
      setNote("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your print request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const unitPrice = getPrintUnitPrice(colorMode, ownPaper, urgent);

  return (
    <form onSubmit={handleSubmit}>
      {status ? (
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "14px",
            border: status.type === "success" ? "1px solid #9ed7a8" : "1px solid #f2c0c0",
            background: status.type === "success" ? "#ecf7ed" : "#fff2f2",
            color: status.type === "success" ? "#155724" : "#842029",
          }}
        >
          {status.message}
        </div>
      ) : null}

      <div className="upload-box" style={{ textAlign: "center" }}>
        <Upload size={28} />
        <p>{file ? file.name : "Upload your document here"}</p>
        <small>Accepted formats: PDF, DOCX, XLSX, DOC</small>
        <input
          id="print-file-input"
          type="file"
          accept=".pdf,.docx,.xlsx,.doc"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="print-file-input" className="page-btn" style={{ marginTop: "1rem" }}>
          {file ? "Change file" : "Select file"}
        </label>

        {file ? (
          <div className="file-preview">
            <div className="file-preview-row file-preview-action-row">
              <strong>Filename:</strong>
              <span>{file.name}</span>
              <button type="button" className="remove-file-btn" onClick={handleRemoveFile}>
                Remove file
              </button>
            </div>
            <div className="file-preview-row">
              <strong>Type:</strong>
              <span>{file.type || "Unknown"}</span>
            </div>
            <div className="file-preview-row">
              <strong>Size:</strong>
              <span>{Math.round(file.size / 1024)} KB</span>
            </div>
            <div className="file-preview-row file-preview-content-row">
              <strong>Preview:</strong>
              <div className="preview-box">
                {previewUrl && file.type === "application/pdf" ? (
                  <iframe src={previewUrl} title="PDF file preview" />
                ) : (
                  <div className="preview-fallback">
                    <p>
                      Preview is only available for PDF files in the browser.
                    </p>
                    <a href={previewUrl ?? "#"} download={file.name}>
                      Download to view this file
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="file-preview-row">
              <strong>Note:</strong>
              <span>
                Uploaded file is stored for printing. If you upload multiple files,
                use separate requests.
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <label htmlFor="quantity">Copy</label>
      <input
        id="quantity"
        className="page-input"
        type="number"
        min={1}
        value={quantity}
        onChange={(event) =>
          setQuantity(Math.max(1, Number(event.target.value) || 1))
        }
      />

      <label htmlFor="colorMode">Print type</label>
      <select
        id="colorMode"
        className="page-input"
        value={colorMode}
        onChange={(event) =>
          setColorMode(event.target.value as PrintColorMode)
        }
      >
        <option value="black-and-white">Black & White</option>
        <option value="colored-minimal">Colored Minimal</option>
        <option value="colored-half">Colored Half</option>
        <option value="colored-full">Colored Full</option>
      </select>

      <label className="page-input" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <input
          type="checkbox"
          checked={ownPaper}
          onChange={(event) => setOwnPaper(event.target.checked)}
          style={{ width: "18px", height: "18px" }}
        />
        <span>I will bring my own paper (price less than ₱1.00 per copy)</span>
      </label>

      <label className="page-input" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <input
          type="checkbox"
          checked={urgent}
          onChange={(event) => setUrgent(event.target.checked)}
          style={{ width: "18px", height: "18px" }}
        />
        <span>Urgent print service (+₱10 per copy)</span>
      </label>

      <label htmlFor="note">Additional note</label>
      <textarea
        id="note"
        className="page-textarea"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Add any special instructions for your print job"
      />

      <div className="price-list">
        <h4>Price list</h4>
        <ul>
          <li>Black and White - ₱2.00</li>
          <li>Colored Minimal - ₱3.00</li>
          <li>Colored Half - ₱5.00</li>
          <li>Colored Full - ₱7.00</li>
          <li>Bring your own paper - subtract ₱1.00 from the selected rate</li>
        </ul>
      </div>

      <div style={{ margin: "1rem 0", display: "grid", gap: "0.4rem" }}>
        <span style={{ color: "#4b5f7a", fontWeight: 700 }}>
          Price per copy: ₱{unitPrice.toFixed(2)}
        </span>
        <span style={{ color: "#071a38", fontWeight: 800 }}>
          Estimated total: ₱{totalPrice.toFixed(2)}
        </span>
      </div>

      <button className="page-btn" type="submit" disabled={loading}>
        {loading ? "Submitting request..." : "Submit Print Request"}
      </button>
    </form>
  );
}
