import { useEffect, useState } from "react";
import { Megaphone, CalendarDays } from "lucide-react";
import { getAnnouncements } from "../services/announcementService";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category?: string;
  created_at: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const latestUpdate = announcements.length
    ? new Date(
        Math.max(...announcements.map((item) => new Date(item.created_at).getTime()))
      )
    : null;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);

      const { data, error } = await getAnnouncements();

      if (!error && data) {
        setAnnouncements(data);
      }

      setLoading(false);
    };

    void fetchAnnouncements();
  }, []);

  return (
    <div className="student-page announcements-page">
      <div className="page-title">
        <Megaphone size={26} />
        <div>
          <h1>Announcements</h1>
          <p>Official updates from StudentHub and SSG.</p>
        </div>
      </div>

      {loading && <p>Loading announcements...</p>}

      {!loading && announcements.length === 0 && (
        <div className="page-card">
          <h3>No announcements yet</h3>
          <p>Please check back later for the latest news.</p>
        </div>
      )}

      {!loading && announcements.length > 0 && (
        <>
          <div className="announcement-topbar">
            <div className="announcement-summary">
              <div className="announcement-summary-card">
                <span>{announcements.length}</span>
                <p>Total announcements</p>
              </div>
              <div className="announcement-summary-card">
                <span>
                  {latestUpdate
                    ? latestUpdate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </span>
                <p>Latest update</p>
              </div>
            </div>
          </div>

          <div className="page-list grid">
            {announcements.map((item) => (
              <article className="announcement-card" key={item.id}>
                <div className="announcement-card-header">
                  <span>{item.category || "General"}</span>
                  <small className="announcement-date">
                    <CalendarDays size={14} />
                    {new Date(item.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </small>
                </div>

                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <div className="announcement-meta">Posted to all students</div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}