import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Megaphone,
  FileText,
  Printer,
  ArrowRight,
  Bot,
  BookOpen,
  CheckSquare2,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

import { supabase } from "../../../lib/supabase";

export default function Dashboard() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const examCountdown = "2 days 4 hrs";
  const missedSessions = 1;
  const attendanceRate = 95;

  const loadDashboard = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const studentId = user.user_metadata?.student_id;

    const { data, error } = await supabase
      .from("student_records")
      .select("*")
      .eq("student_id", studentId)
      .single();

    if (!error) {
      setStudent(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="student-page">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Good day, {student?.first_name || "Student"} 👋</h1>
        <p>
          Welcome to <strong>StudentHub</strong>. Here are your latest updates
          and quick actions.
        </p>
      </div>

      <div className="creative-grid">
        {/* Large Hero Card */}
        <div className="grid-card hero-card">
          <div className="hero-content">
            <h2>Ready to achieve greatness?</h2>
            <p>Track your progress, manage requests, and stay connected with campus life.</p>
            <Link to="/student/events">
              <button className="hero-btn">Explore Opportunities <ArrowRight size={16} /></button>
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="grid-card profile-card">
          <div className="profile-inner">
            <div className="student-avatar-large">
              {student?.first_name?.charAt(0) || "S"}
              {student?.last_name?.charAt(0) || ""}
            </div>
            <h3>{student?.first_name || "Student"}</h3>
            <p>{student?.program || "Program"}</p>
            <span className="status-badge">Active</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid-card metric-card announcements">
          <div className="metric-icon">
            <Megaphone size={28} />
          </div>
          <div className="metric-content">
            <h4>12</h4>
            <p>Announcements</p>
          </div>
        </div>

        <div className="grid-card metric-card events">
          <div className="metric-icon">
            <CalendarDays size={28} />
          </div>
          <div className="metric-content">
            <h4>5</h4>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="grid-card metric-card exams">
          <div className="metric-icon">
            <BookOpen size={28} />
          </div>
          <div className="metric-content">
            <h4>3</h4>
            <p>Exam Schedule</p>
          </div>
        </div>

        {/* Attendance Overview - Large */}
        <div className="grid-card attendance-card large">
          <div className="panel-header">
            <h2>Attendance Overview</h2>
            <Link to="/student/attendance">View Details</Link>
          </div>
          <div className="attendance-visual">
            <div className="progress-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(attendanceRate / 100) * 339.3} 339.3`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#075adf", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#1e96f3", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="progress-text">{attendanceRate}%</span>
            </div>
            <div className="attendance-stats">
              <div className="stat">
                <strong>Missed Sessions</strong>
                <p>{missedSessions}</p>
              </div>
              <div className="stat">
                <strong>Next Exam In</strong>
                <p>{examCountdown}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid-card actions-card large">
          <div className="panel-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <Link to="/student/printing">
              <div className="action-btn">
                <Printer size={20} />
                <span>Print</span>
              </div>
            </Link>
            <Link to="/student/forms">
              <div className="action-btn">
                <ClipboardList size={20} />
                <span>Forms</span>
              </div>
            </Link>
            <Link to="/student/feedback">
              <div className="action-btn">
                <FileText size={20} />
                <span>Feedback</span>
              </div>
            </Link>
            <Link to="/student/events">
              <div className="action-btn">
                <CalendarDays size={20} />
                <span>Events</span>
              </div>
            </Link>
            <Link to="/student/exam-schedule">
              <div className="action-btn">
                <BookOpen size={20} />
                <span>Exams</span>
              </div>
            </Link>
            <Link to="/student/attendance">
              <div className="action-btn">
                <CheckSquare2 size={20} />
                <span>Attendance</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="grid-card announcements-card large">
          <div className="panel-header">
            <h2>Latest Updates</h2>
            <Link to="/student/announcements">View All</Link>
          </div>
          <div className="updates-list">
            <div className="update-item">
              <div className="update-dot"></div>
              <div>
                <strong>SSG General Assembly</strong>
                <p>All students are encouraged to attend tomorrow at 2 PM.</p>
              </div>
            </div>
            <div className="update-item">
              <div className="update-dot"></div>
              <div>
                <strong>Printing Service Available</strong>
                <p>You can now submit print requests online through StudentHub.</p>
              </div>
            </div>
            <div className="update-item">
              <div className="update-dot"></div>
              <div>
                <strong>Club Document Submission</strong>
                <p>Club presidents may upload CBLs and documents this week.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Status */}
        <div className="grid-card status-card">
          <div className="status-icon">
            <CheckCircle2 size={32} />
          </div>
          <h3>Good Standing</h3>
          <p>No active sanctions</p>
        </div>

        {/* AI Assistant */}
        <div className="grid-card ai-card">
          <div className="ai-content">
            <Bot size={40} />
            <h3>Need Help?</h3>
            <p>Ask AI Assistant</p>
            <Link to="/student/assistant">
              <button className="ai-btn">Start Chat <ArrowRight size={14} /></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}