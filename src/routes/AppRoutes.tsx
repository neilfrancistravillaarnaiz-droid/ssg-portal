import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../features/landing/pages/LandingPage";

import LoginPage from "../features/auth/pages/LoginPage";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOTP from "../features/auth/pages/VerifyOTP";

import StudentDashboardLayout from "../features/student/layout/StudentDashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../features/student/pages/Dashboard";
import Announcements from "../features/student/pages/Announcements";
import Events from "../features/student/pages/Events";
import Organizations from "../features/student/pages/Organizations";
import Forms from "../features/student/pages/Forms";
import Printing from "../features/student/pages/Printing";
import Sanctions from "../features/student/pages/Sanctions";
import Feedback from "../features/student/pages/Feedback";
import Assistant from "../features/student/pages/Assistant";
import ExamSchedule from "../features/student/pages/ExamSchedule";
import Attendance from "../features/student/pages/Attendance";
import Profile from "../features/student/pages/Profile";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminStudents from "../features/admin/pages/Students";
import AdminPresidents from "../features/admin/pages/Presidents";
import PresidentDashboard from "../features/president/pages/Dashboard";
import PrintQueue from "../features/admin/pages/PrintQueue";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Student Dashboard */}
      <Route path="/student" element={<StudentDashboardLayout />}>
        {/* Redirect /student -> /student/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="events" element={<Events />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="forms" element={<Forms />} />
        <Route path="printing" element={<Printing />} />
        <Route path="sanctions" element={<Sanctions />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="exam-schedule" element={<ExamSchedule />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminLogin initialSignup />} />
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="presidents" element={<AdminPresidents />} />
        <Route path="print-queue" element={<PrintQueue />} />
      </Route>

      <Route path="/president/dashboard" element={<PresidentDashboard />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}