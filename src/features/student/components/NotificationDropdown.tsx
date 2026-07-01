const notifications = [
  {
    title: "New Announcement",
    message: "SSG General Assembly has been posted.",
    time: "2 mins ago",
  },
  {
    title: "Printing Update",
    message: "Your print request is pending review.",
    time: "1 hour ago",
  },
  {
    title: "Event Reminder",
    message: "Leadership seminar starts tomorrow.",
    time: "Yesterday",
  },
];

export default function NotificationDropdown() {
  return (
    <div className="dropdown-panel notification-panel">
      <div className="dropdown-header">
        <h3>Notifications</h3>
        <button>Mark all read</button>
      </div>

      {notifications.map((item) => (
        <div className="notification-item" key={item.title}>
          <div className="notification-dot" />
          <div>
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}