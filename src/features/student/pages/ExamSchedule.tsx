import { CalendarDays, MapPin, BookOpen } from "lucide-react";

const examSchedule = [
  {
    course: "Calculus 2",
    date: "June 30, 2026",
    time: "9:00 AM - 12:00 PM",
    venue: "Room 204",
  },
  {
    course: "Data Structures",
    date: "July 2, 2026",
    time: "1:00 PM - 4:00 PM",
    venue: "Lab 3",
  },
  {
    course: "Business Communication",
    date: "July 4, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Room 111",
  },
];

export default function ExamSchedule() {
  return (
    <div className="dashboard-page">
      <div className="page-title">
        <BookOpen size={24} />
        <h1>Exam Schedule</h1>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Upcoming Exams</h2>
        </div>

        <div className="activity-list">
          {examSchedule.map((exam) => (
            <div key={exam.course} className="activity-item">
              <div>
                <strong>{exam.course}</strong>
                <p>{exam.date}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>
                  <CalendarDays size={16} /> {exam.time}
                </p>
                <p>
                  <MapPin size={16} /> {exam.venue}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid" style={{ marginTop: "1.5rem" }}>
          <div className="dashboard-panel" style={{ padding: "1.25rem" }}>
            <h3>How it works</h3>
            <p style={{ color: "#6b7280", marginTop: "0.75rem" }}>
              Use this page to view your official exam dates, times, and locations.
              Contact your adviser if any schedules need clarification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
