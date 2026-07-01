import { useEffect, useState } from "react";
import { getStudents } from "../../student/services/studentService";

interface Student {
  id: string;
  full_name: string;
  email: string;
  program: string;
  year_level: string;
  section: string;
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load students.");
      } finally {
        setLoading(false);
      }
    };

    void loadStudents();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-title">
        <h1>Student Management</h1>
        <p>Browse and manage student records from the admin portal.</p>
      </div>

      {loading ? (
        <p>Loading student records...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="page-card table-card">
          <div className="table-row table-header">
            <span>Name</span>
            <span>Email</span>
            <span>Program</span>
            <span>Year</span>
            <span>Section</span>
          </div>
          {students.map((student) => (
            <div key={student.id} className="table-row">
              <span>{student.full_name}</span>
              <span>{student.email}</span>
              <span>{student.program}</span>
              <span>{student.year_level}</span>
              <span>{student.section}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
