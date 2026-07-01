import { CalendarDays } from "lucide-react";

const events = [
  {
    title: "Leadership Training Seminar",
    date: "July 12, 2026",
    venue: "AVR Room",
  },
  {
    title: "Club Fair 2026",
    date: "July 20, 2026",
    venue: "Campus Grounds",
  },
];

export default function Events() {
  return (
    <div className="student-page">
      <div className="page-title">
        <CalendarDays size={26} />
        <div>
          <h1>Events</h1>
          <p>View upcoming events and activities.</p>
        </div>
      </div>

      <div className="page-list">
        {events.map((event) => (
          <div className="page-card" key={event.title}>
            <h3>{event.title}</h3>
            <span>{event.date}</span>
            <p>{event.venue}</p>
            <button className="page-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}