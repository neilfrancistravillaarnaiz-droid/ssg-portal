import { useEffect, useState } from "react";
import { fetchPrintRequests } from "../../../services/print";

type PrintRequest = {
  id: number;
  student_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string | null;
  quantity: number;
  color_mode: string;
  own_paper: boolean;
  note: string;
  unit_price: number;
  total_price: number;
  status: string;
};

export default function PrintQueue() {
  const [requests, setRequests] = useState<PrintRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchPrintRequests();
        setRequests(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load print requests.");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <div>
      <h2>Print Requests</h2>
      <p>Review all uploaded requests and check file details here.</p>

      {loading ? (
        <div>Loading print requests...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : requests.length === 0 ? (
        <div>No print requests found.</div>
      ) : (
        <div className="print-requests-table">
          <div className="print-requests-row header">
            <span>Student</span>
            <span>File</span>
            <span>Copies</span>
            <span>Mode</span>
            <span>Own Paper</span>
            <span>Total</span>
            <span>Status</span>
          </div>
          {requests.map((request) => (
            <div key={request.id} className="print-requests-row">
              <span>{request.student_id}</span>
              <span>
                <a href={request.file_url ?? "#"} target="_blank" rel="noreferrer">
                  {request.file_name}
                </a>
              </span>
              <span>{request.quantity}</span>
              <span>{request.color_mode}</span>
              <span>{request.own_paper ? "Yes" : "No"}</span>
              <span>₱{request.total_price.toFixed(2)}</span>
              <span>{request.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
