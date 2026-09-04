import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  CheckSquare2,
  FileText,
  LayoutDashboard,
  Megaphone,
  BookOpen,
  Printer,
  Search,
  UserCircle2,
  Users,
} from "lucide-react";
import SearchModal from "./SearchModal";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { supabase } from "../../../lib/supabase";

const dashboardNavigation = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { title: "Announcements", icon: Megaphone, path: "/student/announcements" },
  { title: "Events", icon: CalendarDays, path: "/student/events" },
  { title: "Exam Schedule", icon: BookOpen, path: "/student/exam-schedule" },
  { title: "Attendance", icon: CheckSquare2, path: "/student/attendance" },
  { title: "Organizations", icon: Users, path: "/student/organizations" },
  { title: "Forms", icon: FileText, path: "/student/forms" },
  { title: "Printing", icon: Printer, path: "/student/printing" },
];

export default function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    loadUser();

    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.user_metadata?.first_name) {
      setUserName(user.user_metadata.first_name);
    }
  };

  return (
    <>
      <header className="topbar">
        <div>
          <br></br>
          <h2>Good day, {userName}</h2>
          <br></br>
          <p>Welcome to your StudentHub portal</p>
        </div>

        <nav className="topbar-navigation" aria-label="StudentHub navigation">
          {dashboardNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.path} to={item.path} className="topbar-nav-link">
                <Icon size={17} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="topbar-right">
          <button className="search-box-btn" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
            <span>Search StudentHub...</span>
            <kbd>Ctrl K</kbd>
          </button>

          <div className="dropdown-wrap">
            <button
              className="icon-btn has-badge"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
            >
              <Bell size={20} />
              <span className="notif-badge">3</span>
            </button>

            {notifOpen && <NotificationDropdown />}
          </div>

          <div className="dropdown-wrap">
            <button
              className="profile-avatar"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <UserCircle2 size={28} />
            </button>

            {profileOpen && (
  <ProfileDropdown onClose={() => setProfileOpen(false)} />
)}
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}