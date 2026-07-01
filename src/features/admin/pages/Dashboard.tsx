import { Link } from "react-router-dom";
import { Users, UserCheck, FileText, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-title">
        <LayoutDashboard size={28} />
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage students, club presidents, and system operations from one place.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/students" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Students</h2>
          </div>
          <p>View student records, enrollment status, and account details.</p>
          <div className="admin-card-icon">
            <Users size={28} />
          </div>
        </Link>

        <Link to="/admin/presidents" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Presidents</h2>
          </div>
          <p>Review club presidents and officer access permissions.</p>
          <div className="admin-card-icon">
            <UserCheck size={28} />
          </div>
        </Link>

        <Link to="/admin/print-queue" className="dashboard-panel admin-card">
          <div className="panel-header">
            <h2>Print Queue</h2>
          </div>
          <p>Manage active printing requests and review recent submissions.</p>
          <div className="admin-card-icon">
            <FileText size={28} />
          </div>
        </Link>
      </div>
    </div>
  );
}
