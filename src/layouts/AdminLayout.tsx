import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  ClipboardList,
} from "lucide-react";
import "../styles/dashboard.scss";

export default function AdminLayout() {
  return (
    <div className="student-layout">
      <aside className="sidebar">
        <div>
          <div className="logo">
            <div className="logo-circle">A</div>
            <span>Admin Hub</span>
          </div>

          <nav>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <LayoutDashboard size={22} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/students"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Users size={22} />
              <span>Students</span>
            </NavLink>
            <NavLink
              to="/admin/presidents"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <UserCheck size={22} />
              <span>Presidents</span>
            </NavLink>
            <NavLink
              to="/admin/print-queue"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FileText size={22} />
              <span>Print Queue</span>
            </NavLink>
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <ClipboardList size={22} />
              <span>Sign In</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="dashboard-main">
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
