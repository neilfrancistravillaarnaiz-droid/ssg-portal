import { useState } from "react";

interface President {
  id: string;
  club: string;
  name: string;
  email: string;
  term: string;
}

const mockPresidents: President[] = [
  { id: "1", club: "ICT Society", name: "Roxanne Dela Cruz", email: "roxanne@campus.edu", term: "2025-2026" },
  { id: "2", club: "Arts Collective", name: "Miguel Santos", email: "miguel@campus.edu", term: "2025-2026" },
  { id: "3", club: "Business Council", name: "Leah Reyes", email: "leah@campus.edu", term: "2025-2026" },
];

export default function AdminPresidents() {
  const [presidents] = useState<President[]>(mockPresidents);

  return (
    <div className="dashboard-page">
      <div className="page-title">
        <h1>Club Presidents</h1>
        <p>Review current club presidents and president-level access.</p>
      </div>

      <div className="page-card table-card">
        <div className="table-row table-header">
          <span>Club</span>
          <span>President</span>
          <span>Email</span>
          <span>Term</span>
        </div>
        {presidents.map((president) => (
          <div key={president.id} className="table-row">
            <span>{president.club}</span>
            <span>{president.name}</span>
            <span>{president.email}</span>
            <span>{president.term}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
