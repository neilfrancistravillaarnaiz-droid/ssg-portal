import { MessageCircle } from "lucide-react";

export default function Feedback() {
  return (
    <div className="student-page">
      <div className="page-title">
        <MessageCircle size={26} />
        <div>
          <h1>Feedback</h1>
          <p>Send feedback to SSG officers and event organizers.</p>
        </div>
      </div>

      <div className="page-card">
        <label>Subject</label>
        <input className="page-input" placeholder="Enter feedback subject" />

        <label>Message</label>
        <textarea
          className="page-textarea"
          placeholder="Write your feedback..."
        />

        <button className="page-btn">Submit Feedback</button>
      </div>
    </div>
  );
}