import { Link } from "react-router-dom";
import { Users, CalendarDays, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-title">
        <h1>President Dashboard</h1>
        <p>Access club reports, event plans, and member management tools.</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/student/organizations" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Club Info</h2>
          </div>
          <p>Review your club details and officer roles.</p>
          <Users size={28} />
        </Link>

        <Link to="/student/events" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Events</h2>
          </div>
          <p>Plan club events and track student attendance.</p>
          <CalendarDays size={28} />
        </Link>

        <Link to="/student/forms" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Documents</h2>
          </div>
          <p>Upload club forms, CBLs, and approvals.</p>
          <FileText size={28} />
        </Link>
      </div>
    </div>
  );
}
