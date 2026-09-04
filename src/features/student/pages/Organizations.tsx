import rcyLogo from "../../../assets/organizations/rcy-logo.jpg";
import peerLogo from "../../../assets/organizations/peer-logo.jpg";
import creativeVisionariesLogo from "../../../assets/logos/CV.jpg";
import techedLogo from "../../../assets/logos/TECHED.jpg";
import udsuhanLogo from "../../../assets/logos/UDSUHAN.jpg";
import eceaLogo from "../../../assets/logos/ECEA.jpg";
import gamaLogo from "../../../assets/logos/gama.jpg";
import pabulusLogo from "../../../assets/logos/pabulus.jpg";
import lightLogo from "../../../assets/logos/light.jpg";
import himigLogo from "../../../assets/logos/himig.jpg";
import asensoLogo from "../../../assets/logos/asenso.jpg";
import sibyaLogo from "../../../assets/logos/sibya.jpg";
import checkmateLogo from "../../../assets/logos/checkmate.jpg";
import bibliophileLogo from "../../../assets/logos/ccd.jpg";
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
    name: "Creative Visionaries Club", type: "Multimedia Club", logo: creativeVisionariesLogo, members: "150 Members",
  },
  { name: "TechEd Innovators Club", type: "Programming Club", logo: techedLogo, members: "130 Members" },
  { name: "Udsuhan Dance Club", type: "Dance Club", logo: udsuhanLogo, members: "95 Members" },
  { name: "ECEA", type: "Early Childhood Club", logo: eceaLogo, members: "110 Members" },
  { name: "GAMA", type: "Arts Club", logo: gamaLogo, members: "125 Members" },
  { name: "Pabulus", type: "Indigenous People Club", logo: pabulusLogo, members: "90 Members" },
  { name: "Light Bearers", type: "Campus Ministry", logo: lightLogo, members: "80 Members" },
  { name: "Himig Kolehiyo", type: "Music Club", logo: himigLogo, members: "105 Members" },
  { name: "Peer Facilitator Guild", type: "Peer Facilitators Club", logo: peerLogo, members: "115 Members" },
  { name: "Asenso Kolehiyo", type: "Entrepreneurship Club", logo: asensoLogo, members: "95 Members" },
  { name: "SIBYA", type: "School Publication", logo: sibyaLogo, members: "120 Members" },
  { name: "Checkmate", type: "Chess Club", logo: checkmateLogo, members: "88 Members" },
  { name: "Redcross Youth", type: "Emergency Response Club", logo: rcyLogo, members: "98 Members" },
  { name: "Bibliophile", type: "Book Club", logo: bibliophileLogo, members: "106 Members" },
].map((organization) => ({
  ...organization,
  cover: `${organization.type} • ${organization.members}`,
  description: `A registered student organization focused on ${organization.type.toLowerCase()} and student engagement.`,
  adviser: "Organization Adviser",
  president: "Student President",
  activities: "Club activities, projects, and campus events",
  facebook: "#",
  website: "#",
}));

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

      <div className="org-directory-heading">
        <div>
          <span className="eyebrow">Registered clubs</span>
          <h2>Student organization directory</h2>
        </div>
        <strong>{organizations.length} organizations</strong>
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