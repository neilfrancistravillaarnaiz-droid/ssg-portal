import ssgLogo from "../../../assets/organizations/logo-ssg.jpg";
import rcyLogo from "../../../assets/organizations/rcy-logo.jpg";
import peerLogo from "../../../assets/organizations/peer-logo.jpg";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
  Users,
  CalendarDays,
} from "lucide-react";

const organizations = [
  {
    name: "Supreme Student Government",
    type: "Governing Body",
    logo: ssgLogo,
    cover: "Student leadership and governance",
    description:
      "The official student governing body representing student welfare, services, and leadership.",
    adviser: "SSG Adviser",
    president: "SSG President",
    members: "All Students",
    activities: "Assemblies, student services, leadership programs",
    facebook: "#",
    website: "#",
  },
  {
    name: "City College of Davao Red Cross Youth Organization",
    type: "Academic Organization",
    logo: rcyLogo,
    cover: "Technology, innovation, and digital skills",
    description:
      "Promotes programming, digital literacy, technology awareness, and innovation among students.",
    adviser: "ICT Adviser",
    president: "ICT President",
    members: "120 Members",
    activities: "Coding sessions, tech talks, workshops",
    facebook: "#",
    website: "#",
  },
  {
    name: "Peer Facilitators Guild",
    type: "Cultural Organization",
    logo: peerLogo,
    cover: "Creativity, culture, and expression",
    description:
      "Encourages creativity, culture, performance, visual arts, and student expression.",
    adviser: "Arts Adviser",
    president: "Arts President",
    members: "80 Members",
    activities: "Performances, exhibits, cultural events",
    facebook: "#",
    website: "#",
  },
];

export default function Organizations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const nextOrg = () => {
    setActiveIndex((prev) => (prev + 1) % organizations.length);
  };

  const prevOrg = () => {
    setActiveIndex((prev) =>
      prev === 0 ? organizations.length - 1 : prev - 1
    );
  };

  const activeOrg = organizations[activeIndex];

  return (
    <div className="organizations-page">
      <div className="page-title">
        <Users size={28} />
        <div>
          <h1>Organizations</h1>
          <p>Explore recognized clubs, officers, activities, and social links.</p>
        </div>
      </div>

      <div className="org-feature-card" onClick={() => setSelectedOrg(activeOrg)}>
        <div className="org-feature-cover">
          <span>{activeOrg.cover}</span>
        </div>

        <div className="org-feature-content">
          <div className="org-feature-logo">
            <img src={activeOrg.logo} alt={activeOrg.name} />
          </div>

          <div className="org-feature-details">
            <span className="org-type">{activeOrg.type}</span>
            <h2>{activeOrg.name}</h2>
            <p>{activeOrg.description}</p>
          </div>

          <button className="page-btn">View Organization</button>
        </div>
      </div>

      <div className="org-controls">
        <button onClick={prevOrg}>
          <ChevronLeft size={20} />
        </button>

        <div className="org-dots">
          {organizations.map((_, index) => (
            <button
              key={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <button onClick={nextOrg}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="org-mini-grid">
        {organizations.map((org, index) => (
          <button
            key={org.name}
            className={index === activeIndex ? "org-mini-card active" : "org-mini-card"}
            onClick={() => setActiveIndex(index)}
          >
            <img src={org.logo} alt={org.name} />
            <div>
              <strong>{org.name}</strong>
              <span>{org.type}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedOrg && (
        <div className="org-modal-overlay" onClick={() => setSelectedOrg(null)}>
          <div className="org-modal premium" onClick={(e) => e.stopPropagation()}>
            <button className="org-modal-close" onClick={() => setSelectedOrg(null)}>
              <X size={20} />
            </button>

            <div className="org-modal-cover">
              <span>{selectedOrg.cover}</span>
            </div>

            <div className="org-modal-body">
              <div className="org-modal-header">
                <div className="org-modal-logo">
                  <img src={selectedOrg.logo} alt={selectedOrg.name} />
                </div>

                <div className="org-modal-titleblock">
                  <span className="org-type">{selectedOrg.type}</span>
                  <h2>{selectedOrg.name}</h2>
                  <p>{selectedOrg.description}</p>
                </div>
              </div>

              <div className="org-info-grid">
                <div>
                  <small>President</small>
                  <strong>{selectedOrg.president}</strong>
                </div>

                <div>
                  <small>Adviser</small>
                  <strong>{selectedOrg.adviser}</strong>
                </div>

                <div>
                  <small>Members</small>
                  <strong>{selectedOrg.members}</strong>
                </div>

                <div>
                  <small>Activities</small>
                  <strong>{selectedOrg.activities}</strong>
                </div>
              </div>

              <div className="org-socials">
                <a href={selectedOrg.facebook}>
                  <ExternalLink size={18} />
                  Facebook Page
                </a>

                <a href={selectedOrg.website}>
                  <Globe size={18} />
                  Website
                </a>

                <button>
                  <CalendarDays size={18} />
                  View Activities
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}