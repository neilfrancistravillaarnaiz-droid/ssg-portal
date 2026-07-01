import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Search,
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  Printer,
  ShieldAlert,
  Bot,
  FileText,
  MessageCircle,
  UserCircle2,
  BookOpen,
  CheckSquare2,
} from "lucide-react";

type Props = {
  onClose: () => void;
};

const searchableItems = [
  { title: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { title: "Announcements", path: "/student/announcements", icon: Megaphone },
  { title: "Events", path: "/student/events", icon: CalendarDays },
  { title: "Organizations", path: "/student/organizations", icon: Users },
  { title: "Forms", path: "/student/forms", icon: FileText },
  { title: "Printing", path: "/student/printing", icon: Printer },
  { title: "Sanctions", path: "/student/sanctions", icon: ShieldAlert },
  { title: "Feedback", path: "/student/feedback", icon: MessageCircle },
  { title: "Exam Schedule", path: "/student/exam-schedule", icon: BookOpen },
  { title: "Attendance", path: "/student/attendance", icon: CheckSquare2 },
  { title: "AI Assistant", path: "/student/assistant", icon: Bot },
  { title: "Profile", path: "/student/profile", icon: UserCircle2 },
];

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    return searchableItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const openResult = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <div className="search-modal-header">
          <Search size={20} />
          <input
            autoFocus
            placeholder="Search StudentHub..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-results">
          {results.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.path} onClick={() => openResult(item.path)}>
                <Icon size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}

          {results.length === 0 && <p className="empty-search">No results found.</p>}
        </div>
      </div>
    </div>
  );
}