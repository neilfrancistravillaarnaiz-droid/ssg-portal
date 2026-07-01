import { ShieldAlert } from "lucide-react";

export default function Sanctions() {
  return (
    <div className="student-page">
      <div className="page-title">
        <ShieldAlert size={26} />
        <div>
          <h1>Sanctions</h1>
          <p>View sanctions, comments, and upload proof of attendance.</p>
        </div>
      </div>

      <div className="page-card">
        <h3>No Active Sanctions</h3>
        <p>You currently have no active event sanctions.</p>
      </div>
    </div>
  );
}