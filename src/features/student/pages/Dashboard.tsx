import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Megaphone,
  Users,
  FileText,
  Printer,
  ArrowRight,
  ShieldAlert,
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

      <div className="student-info-banner">
        <div className="student-avatar">
          {student?.first_name?.charAt(0) || "S"}
          {student?.last_name?.charAt(0) || ""}
        </div>

        <div>
          <h2>Welcome back, {student?.first_name || "Student"}!</h2>
          <p>
            {student?.program || "Student Program"} •{" "}
            {student?.year_level || "Year Level"} •{" "}
            {student?.section || "Section"}
          </p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dash-card">
          <div className="dash-card-icon">
            <Megaphone size={24} />
          </div>
          <div>
            <h3>12</h3>
            <p>Announcements</p>
            <span>Latest campus updates</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon">
            <CalendarDays size={24} />
          </div>
          <div>
            <h3>5</h3>
            <p>Upcoming Events</p>
            <span>This month</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <h3>3</h3>
            <p>Exam Schedule</p>
            <span>Next tests and venues</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon">
            <CheckSquare2 size={24} />
          </div>
          <div>
            <h3>2</h3>
            <p>Attendance</p>
            <span>Sessions marked today</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon">
            <FileText size={24} />
          </div>
          <div>
            <h3>2</h3>
            <p>Pending Requests</p>
            <span>Printing / forms</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3>0</h3>
            <p>Active Sanctions</p>
            <span>Good standing</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel attendance-panel">
          <div className="panel-header">
            <h2>Attendance Overview</h2>
            <Link to="/student/attendance">View Details</Link>
          </div>

          <div className="attendance-summary">
            <div>
              <h3>{attendanceRate}%</h3>
              <p>Attendance Rate</p>
            </div>
            <div>
              <h3>{missedSessions}</h3>
              <p>Missed Sessions</p>
            </div>
            <div>
              <h3>{examCountdown}</h3>
              <p>Next Exam In</p>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Recent Announcements</h2>
            <Link to="/student/announcements">View All</Link>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>SSG General Assembly</strong>
                <p>All students are encouraged to attend.</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Printing Service Available</strong>
                <p>You can now submit print requests online.</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Club Document Submission</strong>
                <p>Club presidents may upload CBLs and documents.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <Link to="/student/printing">
              <button>
                <Printer size={20} />
                Request Printing
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/student/forms">
              <button>
                <ClipboardList size={20} />
                Student Forms
               <ArrowRight size={18} />
                </button>
            </Link>

            <Link to="/student/feedback">
              <button>
                <FileText size={20} />
                Send Feedback
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/student/events">
              <button>
                <CalendarDays size={20} />
                View Events
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/student/exam-schedule">
              <button>
                <BookOpen size={20} />
                Exam Schedule
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/student/attendance">
              <button>
                <CheckSquare2 size={20} />
                Take Attendance
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/student/organizations">
              <button>
                <Users size={20} />
                Browse Clubs
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-grid second-row">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Student Status</h2>
            <Link to="/student/profile">View Profile</Link>
          </div>

          <div className="status-summary">
            <div className="status-summary-icon">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <h3>Good Standing</h3>
              <p>
                You currently have no active sanctions or unresolved student
                concerns.
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-panel ai-panel">
          <div>
            <h2>Need help?</h2>
            <p>
              Ask the StudentHub AI Assistant about events, sanctions, printing,
              clubs, and services.
            </p>
          </div>

          <Link to="/student/assistant">
            <button className="ai-btn">
              <Bot size={18} />
              Ask AI Assistant
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}