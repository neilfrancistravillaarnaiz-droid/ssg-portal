import { BookOpen } from "lucide-react";

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
          <div>
            <span className="schedule-label">Official examination schedule</span>
            <h2>Upcoming Examinations</h2>
          </div>
          <span className="schedule-term">Academic Year 2026</span>
        </div>

        <div className="exam-table-wrapper">
          <table className="exam-table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Subject / Course</th>
                <th scope="col">Examination Date</th>
                <th scope="col">Time</th>
                <th scope="col">Room / Venue</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((exam, index) => (
                <tr key={exam.course}>
                  <td data-label="No.">{String(index + 1).padStart(2, "0")}</td>
                  <th scope="row" data-label="Subject / Course">{exam.course}</th>
                  <td data-label="Examination Date">{exam.date}</td>
                  <td data-label="Time">{exam.time}</td>
                  <td data-label="Room / Venue">{exam.venue}</td>
                  <td data-label="Status"><span className="exam-status">Scheduled</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exam-notes">
          <div className="dashboard-panel">
            <h3>How it works</h3>
            <p>
              Use this page to view your official exam dates, times, and locations.
              Contact your adviser if any schedules need clarification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
