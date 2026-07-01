import { useEffect, useState } from "react";
import {
  User,
  Mail,
  IdCard,
  GraduationCap,
  Layers,
  School,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const studentId = user?.user_metadata?.student_id;

    if (!studentId) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("student_records")
      .select("*")
      .eq("student_id", studentId)
      .single();

    setStudent(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="student-page">Loading profile...</div>;
  }

  if (!student) {
    return <div className="student-page">Student profile not found.</div>;
  }

  const fullName = `${student.first_name} ${student.middle_name ?? ""} ${student.last_name}`
    .replace(/\s+/g, " ")
    .trim();

  const initials = `${student.first_name?.[0] ?? "S"}${student.last_name?.[0] ?? ""}`;

  return (
    <div className="profile-page">
      <div className="profile-cover">
        <div className="profile-avatar-large">{initials}</div>

        <div className="profile-main-info">
          <h1>{fullName}</h1>
          <p>{student.program}</p>

          <span className="verified-badge">
            <ShieldCheck size={16} />
            Verified Student
          </span>
        </div>
      </div>

      <div className="profile-content-grid">
        <section className="profile-panel-main">
          <div className="profile-section-title">
            <User size={22} />
            <div>
              <h2>Student Information</h2>
              <p>Your official student record from StudentHub.</p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-card">
              <IdCard size={20} />
              <div>
                <span>Student ID</span>
                <strong>{student.student_id}</strong>
              </div>
            </div>

            <div className="profile-info-card">
              <Mail size={20} />
              <div>
                <span>Email</span>
                <strong>{student.email || "No email linked"}</strong>
              </div>
            </div>

            <div className="profile-info-card">
              <GraduationCap size={20} />
              <div>
                <span>Program</span>
                <strong>{student.program}</strong>
              </div>
            </div>

            <div className="profile-info-card">
              <Layers size={20} />
              <div>
                <span>Year Level</span>
                <strong>{student.year_level}</strong>
              </div>
            </div>

            <div className="profile-info-card">
              <School size={20} />
              <div>
                <span>Section</span>
                <strong>{student.section}</strong>
              </div>
            </div>

            <div className="profile-info-card">
              <Calendar size={20} />
              <div>
                <span>Total Units</span>
                <strong>{student.total_units || "N/A"}</strong>
              </div>
            </div>
          </div>
        </section>

        <aside className="profile-side-panel">
          <h3>Account Status</h3>

          <div className="status-box success">
            <ShieldCheck size={22} />
            <div>
              <strong>Verified</strong>
              <span>Your Student ID is linked to this account.</span>
            </div>
          </div>

          <div className="side-detail">
            <span>Role</span>
            <strong>Student</strong>
          </div>

          <div className="side-detail">
            <span>Registration</span>
            <strong>{student.is_registered ? "Registered" : "Not Registered"}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}