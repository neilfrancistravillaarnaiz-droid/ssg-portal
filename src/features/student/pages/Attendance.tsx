import { useEffect, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  CheckSquare2,
  Clock3,
  QrCode,
  ScanLine,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";

const initialAttendance = [
  {
    id: "event-1",
    event: "Student Leadership Seminar",
    type: "Seminar",
    details: "June 29, 2026 • 10:00 AM • Main Auditorium",
    status: "attended",
    round: "Round 1",
    checkpoints: { morningIn: "attended", morningOut: "attended", afternoonIn: "attended", afternoonOut: "attended" },
  },
  {
    id: "event-2",
    event: "Club Fair Orientation",
    type: "Orientation",
    details: "June 30, 2026 • 1:00 PM • Activity Hall",
    status: "absent",
    round: "Round 1",
    checkpoints: { morningIn: "attended", morningOut: "missed", afternoonIn: "missed", afternoonOut: "attended" },
  },
  {
    id: "event-3",
    event: "Career Prep Workshop",
    type: "Workshop",
    details: "July 1, 2026 • 3:00 PM • Conference Room B",
    status: "attended",
    round: "Round 2",
    checkpoints: { morningIn: "attended", morningOut: "attended", afternoonIn: "attended", afternoonOut: "attended" },
  },
];

const checkpointLabels = [
  ["morningIn", "Morning in"],
  ["morningOut", "Morning out"],
  ["afternoonIn", "Afternoon in"],
  ["afternoonOut", "Afternoon out"],
] as const;

export default function Attendance() {
  const [studentId, setStudentId] = useState("STUDENT-PREVIEW");

  useEffect(() => {
    async function loadStudentId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const id = user?.user_metadata?.student_id;

      if (id) setStudentId(String(id));
    }

    loadStudentId();
  }, []);

  const attendedCount = initialAttendance.filter((record) => record.status === "attended").length;
  const absentCount = initialAttendance.length - attendedCount;
  const attendanceRate = Math.round((attendedCount / initialAttendance.length) * 100);
  const qrValue = `studenthub:attendance:${studentId}`;

  return (
    <main className="dashboard-page attendance-page">
      <div className="page-title">
        <CheckSquare2 size={24} />
        <h1>Attendance</h1>
      </div>

      <div className="attendance-overview-grid">
        <section className="dashboard-panel attendance-qr-panel">
          <div className="attendance-section-heading">
            <div>
              <span className="eyebrow">SSG event check-in</span>
              <h2>Your attendance QR</h2>
              <p>Show this code to an SSG officer when you arrive at an event.</p>
            </div>
            <QrCode size={28} />
          </div>

          <div className="attendance-qr-content">
            <img
              className="attendance-qr"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrValue)}`}
              alt="Personal attendance QR code"
            />
            <div className="attendance-qr-details">
              <span>Student ID</span>
              <strong>{studentId}</strong>
              <div className="scan-note">
                <ScanLine size={18} />
                Ready to scan
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-panel attendance-analytics-panel">
          <div className="attendance-section-heading">
            <div>
              <span className="eyebrow">Round analytics</span>
              <h2>Participation snapshot</h2>
              <p>See how consistently you have shown up for SSG events.</p>
            </div>
            <BarChart3 size={28} />
          </div>
          <div className="attendance-stat-row">
            <div><strong>{attendanceRate}%</strong><span>Attendance rate</span></div>
            <div><strong>{attendedCount}</strong><span>Attended</span></div>
            <div><strong>{absentCount}</strong><span>Absent</span></div>
          </div>
          <div className="round-chart" aria-label="Attendance by round">
            {["Round 1", "Round 2"].map((round) => {
              const roundRecords = initialAttendance.filter((record) => record.round === round);
              const roundAttended = roundRecords.filter((record) => record.status === "attended").length;
              const percentage = roundRecords.length ? (roundAttended / roundRecords.length) * 100 : 0;
              const checkpointSummary = checkpointLabels.map(([key, label]) => {
                const attended = roundRecords.filter((record) => record.checkpoints[key] === "attended").length;
                return { label, attended, total: roundRecords.length };
              });

              return (
                <div className="round-row" key={round}>
                  <div className="round-ring" style={{ "--progress": `${percentage}%` } as React.CSSProperties}>
                    <strong>{Math.round(percentage)}%</strong>
                  </div>
                  <div className="round-details">
                    <div className="round-heading">
                      <span>{round}</span>
                      <strong>{roundAttended}/{roundRecords.length} events</strong>
                    </div>
                    <div className="round-events">
                      {roundRecords.map((record) => <span key={record.id}>{record.event}</span>)}
                    </div>
                    <div className="checkpoint-grid">
                      {checkpointSummary.map(({ label, attended, total }) => (
                        <div className={`checkpoint-item ${attended === total ? "attended" : attended === 0 ? "missed" : "mixed"}`} key={label}>
                          <span>{label}</span>
                          <strong>{attended}/{total}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="dashboard-panel attendance-history-panel">
        <div className="attendance-section-heading">
          <div>
            <span className="eyebrow">Event history</span>
            <h2>Attended and absent events</h2>
          </div>
          <Clock3 size={26} />
        </div>
        <div className="attendance-history-list">
          {initialAttendance.map((record) => (
            <article className="attendance-history-item" key={record.id}>
              <div>
                <strong>{record.event}</strong>
                <span>{record.type} · {record.round} · {record.details}</span>
                <div className="attendance-checkpoints" aria-label={`${record.event} checkpoint attendance`}>
                  {checkpointLabels.map(([key, label]) => (
                    <span className={record.checkpoints[key]} key={key}>
                      {record.checkpoints[key] === "attended" ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`attendance-status ${record.status}`}>
                {record.status === "attended" ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
                {record.status === "attended" ? "Attended" : "Absent"}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-panel sanction-summary-panel">
        <div className="attendance-section-heading">
          <div>
            <span className="eyebrow">Student standing</span>
            <h2>Sanction information</h2>
            <p>Review any event-related sanctions connected to your attendance.</p>
          </div>
          <ShieldAlert size={26} />
        </div>
        <div className="sanction-clear-state">
          <CheckCircle2 size={22} />
          <div>
            <strong>No Active Sanctions</strong>
            <span>You currently have no active event sanctions.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
