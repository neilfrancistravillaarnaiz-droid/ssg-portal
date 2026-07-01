import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../../../styles/dashboard.scss";

export default function StudentDashboardLayout() {
  return (
    <div className="student-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}