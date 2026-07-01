import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings,
  UserCircle2,
  HelpCircle,
} from "lucide-react";
import { logoutUser } from "../../auth/services/authService";

type Props = {
  onClose: () => void;
};

export default function ProfileDropdown({ onClose }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="dropdown-panel profile-panel">
      <div className="profile-dropdown-head">
        <UserCircle2 size={42} />
        <div>
          <h3>Student Account</h3>
          <p>StudentHub Portal</p>
        </div>
      </div>

      <Link
        to="/student/profile"
        onClick={onClose}
      >
        <UserCircle2 size={18} />
        My Profile
      </Link>

      <Link
        to="/student/profile"
        onClick={onClose}
      >
        <Settings size={18} />
        Account Settings
      </Link>

      <Link
        to="/student/assistant"
        onClick={onClose}
      >
        <HelpCircle size={18} />
        Help Center
      </Link>

      <button onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}