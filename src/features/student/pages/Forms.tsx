import { FileText } from "lucide-react";

export default function Forms() {
  return (
    <div className="student-page">
      <div className="page-title">
        <FileText size={26} />
        <div>
          <h1>Forms</h1>
          <p>Submit and access online student service forms.</p>
        </div>
      </div>

      <div className="page-list">
        <div className="page-card">
          <h3>Event Excuse Form</h3>
          <p>Submit documents for attendance-related concerns.</p>
          <button className="page-btn">Submit Form</button>
        </div>

        <div className="page-card">
          <h3>General Request Form</h3>
          <p>Send requests to the SSG office online.</p>
          <button className="page-btn">Submit Request</button>
        </div>
      </div>
    </div>
  );
}