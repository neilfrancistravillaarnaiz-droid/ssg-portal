import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  MessageCircle,
  Printer,
  ShieldAlert,
  Bot,
  FileText,
  BookOpen,
  CheckSquare2,
} from "lucide-react";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { title: "Announcements", icon: Megaphone, path: "/student/announcements" },
  { title: "Events", icon: CalendarDays, path: "/student/events" },
  { title: "Exam Schedule", icon: BookOpen, path: "/student/exam-schedule" },
  { title: "Attendance", icon: CheckSquare2, path: "/student/attendance" },
  { title: "Organizations", icon: Users, path: "/student/organizations" },
  { title: "Forms", icon: FileText, path: "/student/forms" },
  { title: "Printing", icon: Printer, path: "/student/printing" },
  { title: "Sanctions", icon: ShieldAlert, path: "/student/sanctions" },
  { title: "Feedback", icon: MessageCircle, path: "/student/feedback" },
  { title: "AI Assistant", icon: Bot, path: "/student/assistant" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-circle">S</div>
          <span>StudentHub</span>
        </div>

        <nav>
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Icon size={22} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}