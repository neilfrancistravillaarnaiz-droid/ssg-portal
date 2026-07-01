import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="student-page">
      <div className="page-title">
        <SettingsIcon size={26} />
        <div>
          <h1>Settings</h1>
          <p>Manage your StudentHub account settings.</p>
        </div>
      </div>

      <div className="page-card">
        <h3>Account Settings</h3>
        <p>Password, notifications, and account preferences will appear here.</p>
      </div>
    </div>
  );
}