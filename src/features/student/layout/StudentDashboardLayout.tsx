import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../../../components/common/Footer";
import "../../../styles/dashboard.scss";

export default function StudentDashboardLayout() {
  return (
    <div className="student-layout">
      <main className="dashboard-main">
        <Topbar />

        <section className="page-content">
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
}