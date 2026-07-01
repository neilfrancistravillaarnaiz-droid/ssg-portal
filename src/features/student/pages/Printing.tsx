import { Printer } from "lucide-react";
import PrintRequestForm from "../components/PrintRequestForm";

export default function Printing() {
  return (
    <div className="student-page">
      <div className="page-title">
        <Printer size={26} />
        <div>
          <h1>Printing</h1>
          <p>Upload PDF, DOCX, or XLSX files for printing services.</p>
        </div>
      </div>

      <div className="page-card">
        <h3>New Print Request</h3>
        <PrintRequestForm />
      </div>
    </div>
  );
}