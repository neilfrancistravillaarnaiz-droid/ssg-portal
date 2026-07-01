import { useState } from "react";
import { CheckSquare2, ClipboardList, Clock3 } from "lucide-react";

const initialAttendance = [
  {
    id: "event-1",
    event: "Student Leadership Seminar",
    type: "Seminar",
    details: "June 29, 2026 • 10:00 AM • Main Auditorium",
    attending: true,
  },
  {
    id: "event-2",
    event: "Club Fair Orientation",
    type: "Orientation",
    details: "June 30, 2026 • 1:00 PM • Activity Hall",
    attending: false,
  },
  {
    id: "event-3",
    event: "Career Prep Workshop",
    type: "Workshop",
    details: "July 1, 2026 • 3:00 PM • Conference Room B",
    attending: true,
  },
];

export default function Attendance() {
  const [records, setRecords] = useState(initialAttendance);
  const [submitted, setSubmitted] = useState(false);

  const toggleAttendance = (id: string) => {
    setSubmitted(false);
    setRecords((current) =>
      current.map((record) =>
        record.id === id
          ? { ...record, attending: !record.attending }
          : record,
      ),
    );
  };

  const submitAttendance = () => {
    setSubmitted(true);
  };

  return (
    <div className="dashboard-page">
      <div className="page-title">
        <CheckSquare2 size={24} />
        <h1>Attendance</h1>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header" style={{ alignItems: "flex-start" }}>
          <div>
            <h2>Event Attendance</h2>
            <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
              Confirm attendance for upcoming campus events and submit the record.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: 800 }}>
              {records.filter((record) => record.attending).length}/{records.length} attending
            </p>
          </div>
        </div>

        <div className="activity-list">
          {records.map((record) => (
            <div key={record.id} className="activity-item">
              <div>
                <strong>{record.event}</strong>
                <div style={{ margin: "0.35rem 0", display: "inline-flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "0.2rem 0.55rem",
                    borderRadius: "999px",
                    background: "rgba(59, 130, 246, 0.12)",
                    color: "#1d4ed8",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {record.type}
                  </span>
                </div>
                <p>{record.details}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleAttendance(record.id)}
                style={{
                  border: "1px solid #dbeafe",
                  borderRadius: "12px",
                  padding: "0.75rem 1rem",
                  background: record.attending ? "#d1fae5" : "#f8fafc",
                  color: record.attending ? "#065f46" : "#1f2937",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  minWidth: "144px",
                  justifyContent: "center",
                }}
              >
                <Clock3 size={16} />
                {record.attending ? "Attending" : "Not attending"}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={submitAttendance}
            style={{
              padding: "0.95rem 1.25rem",
              borderRadius: "14px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <ClipboardList size={18} />
            Submit Attendance
          </button>
          {submitted && (
            <span style={{ color: "#16a34a", fontWeight: 700 }}>
              Attendance saved successfully.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
