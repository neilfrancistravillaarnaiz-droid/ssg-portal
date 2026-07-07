import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Megaphone,
  MessageCircle,
  Printer,
  Users,
  Upload,
  Lock,
} from "lucide-react";
import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import creativeVisionariesLogo from "../../../assets/logos/CV.jpg";
import techedLogo from "../../../assets/logos/TECHED.jpg";
import udsuhanLogo from "../../../assets/logos/UDSUHAN.jpg";
import eceaLogo from "../../../assets/logos/ECEA.jpg";
import gamaLogo from "../../../assets/logos/gama.jpg";
import pabulusLogo from "../../../assets/logos/pabulus.jpg";
import lightLogo from "../../../assets/logos/light.jpg";
import himigLogo from "../../../assets/logos/himig.jpg";
import peerLogo from "../../../assets/logos/peer.jpg";
import asensoLogo from "../../../assets/logos/asenso.jpg";
import sibyaLogo from "../../../assets/logos/sibya.jpg";
import checkmateLogo from "../../../assets/logos/checkmate.jpg";
import rcyLogo from "../../../assets/logos/rcy.jpg";
import ccdLogo from "../../../assets/logos/ccd.jpg";
import cccdBackground from "../../../assets/logos/CCCD.jpg";
import slide2Img from "../../../assets/logos/slide2.jpg";
import "../../../styles/landing.scss";

const stats = [
  { number: "1,250+", label: "Active Students", icon: Users },
  { number: "12+", label: "Registered Clubs", icon: GraduationCap },
  { number: "48", label: "Upcoming Events", icon: CalendarDays },
  { number: "120+", label: "Announcements", icon: Megaphone },
];

const clubs = [
  {
    name: "Creative Visionaries Club",
    short: "Creative Visionaries",
    description: "Multimedia Club",
    members: "150 Members",
    image: creativeVisionariesLogo,
    accent: "navy",
  },
  {
    name: "TechEd Innovators Club",
    short: "TechEd Innovators",
    description: "Programming Club",
    members: "130 Members",
    image: techedLogo,
    accent: "sky",
  },
  {
    name: "Udsuhan Dance Club",
    short: "Udsuhan",
    description: "Dance Club",
    members: "95 Members",
    image: udsuhanLogo,
    accent: "gold",
  },
  {
    name: "ECEA",
    short: "ECEA",
    description: "Early Childhood Club",
    members: "110 Members",
    image: eceaLogo,
    accent: "silver",
  },
  {
    name: "GAMA",
    short: "GAMA",
    description: "Arts Club",
    members: "125 Members",
    image: gamaLogo,
    accent: "navy",
  },
  {
    name: "Pabulus",
    short: "Pabulus",
    description: "Indigenous People Club",
    members: "90 Members",
    image: pabulusLogo,
    accent: "sky",
  },
  {
    name: "Light Bearers",
    short: "Light Bearers",
    description: "Campus Ministry",
    members: "80 Members",
    image: lightLogo,
    accent: "gold",
  },
  {
    name: "Himig Kolehiyo",
    short: "Himig Kolehiyo",
    description: "Music Club",
    members: "105 Members",
    image: himigLogo,
    accent: "silver",
  },
  {
    name: "Peer Facilitator Guild",
    short: "Peer Facilitators Guild",
    description: "Peer Facilitators Club",
    members: "115 Members",
    image: peerLogo,
    accent: "navy",
  },
  {
    name: "Asenso Kolehiyo",
    short: "Asenso Kolehiyo",
    description: "Entrepreneurship Club",
    members: "95 Members",
    image: asensoLogo,
    accent: "sky",
  },
  {
    name: "SIBYA",
    short: "SIBYA",
    description: "School Publication",
    members: "120 Members",
    image: sibyaLogo,
    accent: "gold",
  },
  {
    name: "Checkmate",
    short: "Checkmate",
    description: "Chess Club",
    members: "88 Members",
    image: checkmateLogo,
    accent: "silver",
  },
  {
    name: "Redcross Youth",
    short: "Redcross Youth",
    description: "Emegergency Response Club",
    members: "98 Members",
    image: rcyLogo,
    accent: "navy",
  },
  {
    name: "Bibliophile",
    short: "Bibliophile",
    description: "Book Club",
    members: "106 Members",
    image: ccdLogo,
    accent: "sky",
  },
];

const featuredVideo = {
  title: "StudentHub Highlight",
  subtitle: "Watch our latest campus update or event highlight.",
  description:
    "Share your YouTube video link below and this section will embed the video directly on the landing page.",
  youtubeLink: "https://www.youtube.com/watch?v=f1plxhIiAKg",
};

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

const announcements = [
  {
    title: "Midterm Examination Schedule",
    description: "Please be guided with the schedule of upcoming examinations.",
    time: "2h ago",
    icon: FileText,
    color: "blue",
  },
  {
    title: "SSG General Assembly",
    description:
      "All students are invited to attend the SSG General Assembly this Friday.",
    time: "1d ago",
    icon: Users,
    color: "teal",
  },
  {
    title: "Scholarship Program Now Open",
    description:
      "Applications for the Academic Excellence Scholarship are now open.",
    time: "2d ago",
    icon: GraduationCap,
    color: "orange",
  },
];

const events = [
  {
    month: "JUL",
    day: "05",
    title: "General Assembly",
    time: "8:00 AM - 12:00 PM",
    venue: "School Gymnasium",
  },
  {
    month: "JUL",
    day: "12",
    title: "Leadership Training Seminar",
    time: "1:00 PM - 5:00 PM",
    venue: "AVR Room",
  },
  {
    month: "JUL",
    day: "20",
    title: "Club Fair 2026",
    time: "9:00 AM - 4:00 PM",
    venue: "Campus Grounds",
  },
];

const forms = [
  {
    title: "Printing Request",
    description: "Upload PDF, DOCX, or XLSX files for printing services.",
    icon: Printer,
  },
  {
    title: "Document Submission",
    description: "Submit club documents, CBLs, reports, and other files.",
    icon: Upload,
  },
  {
    title: "Feedback Form",
    description: "Send comments and feedback for SSG events and activities.",
    icon: MessageCircle,
  },
];

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: "video",
      title: "StudentHub Experience",
      subtitle: "Watch our official video logo and discover your student community.",
      type: "video",
    },
    {
      key: "slide2",
      title: "StudentHub Experience",
      subtitle: "Discover the student portal background.",
      type: "image",
      image: slide2Img,
    },
    {
      key: "coming-soon",
      title: "Coming Soon",
      subtitle: "Exciting new features and student experiences are on the way.",
      type: "comingSoon",
    },
  ];

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="brand-logo">
              <video src={ssgLogo} autoPlay loop muted playsInline />
            </div>
          </div>

          <div className="nav-links">
            <a href="#home" className="active">
              Home
            </a>
            <a href="#clubs">Clubs</a>
            <a href="#events">Events</a>
            <a href="#announcements">Announcements</a>
            <a href="#forms">Services</a>
          </div>

          <Link to="login" className="nav-cta">
            Students Hub <ChevronRight size={17} />
          </Link>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={slide.key}
              className={`hero-slide ${activeSlide === index ? "active" : ""} ${slide.type === "image" ? "hero-image-slide" : ""}`}
            >
              {slide.type === "video" ? (
                <div className="hero-video-wrap">
                  <video className="hero-video-bg" src={ssgLogo} autoPlay loop muted playsInline preload="auto" />
                </div>
              ) : slide.type === "image" ? (
                <div className="hero-slide-image-wrap">
                  <img className="hero-slide-img" src={slide.image} alt="Slide content" />
                </div>
              ) : slide.type === "announcements" ? (
                <>
                  {slide.image && (
                    <div className="hero-slide-image-wrap">
                      <img className="hero-slide-bg" src={slide.image} alt="Featured announcement background" />
                    </div>
                  )}
                  <div className="hero-content-card">
                    <span className="slide-label">Featured Announcements</span>
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                    <div className="announcement-list">
                    {announcements.slice(0, 2).map((item) => {
                      return (
                        <div className="announcement-card" key={item.title}>
                          <div className="announcement-icon">
                            {slide.type === "announcements" ? <item.icon size={20} /> : null}
                          </div>
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
              ) : (
                <div className="hero-content-card">
                  <span className="slide-label">Coming Soon</span>
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <div className="coming-soon-list">
                    <div className="coming-card">
                      <h4>Club Showcase</h4>
                      <p>New interactive club previews and live event highlights.</p>
                    </div>
                    <div className="coming-card">
                      <h4>Enhanced Chat</h4>
                      <p>StudentHub AI will soon support faster, smarter campus help.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="hero-slide-controls">
            <button
              type="button"
              className="hero-slide-control prev"
              onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="hero-slide-control next"
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="wave-top" />
        <div className="stats-inner">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div className="stat-card" key={stat.label}>
                <div className="info-icon" aria-hidden>
                  <Icon size={20} />
                </div>
                <div className="stat-copy">
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="clubs-section"
        id="clubs"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.84), rgba(255,255,255,0.84)), url(${cccdBackground})`,
          backgroundSize: "38%",
          backgroundPosition: "center 62%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="clubs-heading">
          <p className="clubs-heading-eyebrow">
            As part of student life at StudentHub, our organizations consistently demonstrate
            fidelity to campus involvement as reflected in their programs, projects, and outreach
            to every student community on campus.
          </p>
          <h2>Explore Student Clubs</h2>
        </div>

        <div className="clubs-layout">
          <div className="clubs-column clubs-column--left">
            {clubs.slice(0, 7).map((club) => (
              <div className="club-item" key={club.name}>
                <div className={`club-item-icon club-item-icon--${club.accent}`}>
                  {club.image ? (
                    <img src={club.image} alt={`${club.name} logo`} />
                  ) : (
                    <span>{club.short}</span>
                  )}
                </div>
                <div className="club-item-text">
                  <h3>{club.short}</h3>
                  <p>{club.description}</p>
                </div>
              </div>
            ))}
          </div>

            {/* Center illustration removed as requested */}

          <div className="clubs-column clubs-column--right">
            {clubs.slice(7, 14).map((club) => (
              <div className="club-item" key={club.name}>
                <div className={`club-item-icon club-item-icon--${club.accent}`}>
                  {club.image ? (
                    <img src={club.image} alt={`${club.name} logo`} />
                  ) : (
                    <span>{club.short}</span>
                  )}
                </div>
                <div className="club-item-text">
                  <h3>{club.short}</h3>
                  <p>{club.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-feature-section">
        <div className="video-feature-inner">
          <div className="video-feature-copy">
            <span>Featured Video</span>
            <h2>{featuredVideo.title}</h2>
            <p>{featuredVideo.description}</p>
            <a href={featuredVideo.youtubeLink} className="btn-outline" target="_blank" rel="noreferrer">
              Open on YouTube
            </a>
          </div>

          <div className="video-feature-player">
            <div className="video-frame">
              <iframe
                src={getYouTubeEmbedUrl(featuredVideo.youtubeLink)}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="updates-section">
        <div className="updates-grid">
          <div className="updates-card" id="announcements">
            <div className="updates-header">
              <h3>Latest Announcements</h3>
              <a href="#announcements">View All</a>
            </div>

            {announcements.map((item) => {
              return (
                <div className="announcement-item" key={item.title}>
                  <div className={`update-icon ${item.color}`}>
                    {item.icon && <item.icon size={20} />}
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span>{item.time}</span>
                </div>
              );
            })}
          </div>

          <div className="updates-card" id="events">
            <div className="updates-header">
              <h3>Upcoming Events</h3>
              <a href="#events">View All</a>
            </div>

            {events.map((event) => (
              <div className="event-item" key={event.title}>
                <div className="event-date">
                  <span>{event.month}</span>
                  <strong>{event.day}</strong>
                </div>
                <div>
                  <h4>{event.title}</h4>
                  <p>{event.time}</p>
                  <small>{event.venue}</small>
                </div>
                <button>View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="forms-section" id="forms">
        <div className="section-heading center">
          <span>Supreme Student Government Services</span>
          <h2>Submit requests online</h2>
          <p>
            Access StudentHub forms for printing services, document submissions,
            feedback, sanction appeals, and organization-related requests.
          </p>
        </div>

        <div className="forms-grid">
          {forms.map((form) => {
            const Icon = form.icon;
            return (
              <div className="form-card" key={form.title}>
                <Icon size={28} />
                <h3>{form.title}</h3>
                <p>{form.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="assistant-banner" id="chatbot">
        <div className="assistant-visual">
          <Bot size={64} />
        </div>
        <div>
          <h2>Need help? Ask StudentHub Assistant</h2>
          <p>
            Our AI-powered assistant is here to help you with questions and
            campus information.
          </p>
        </div>
        <a href="#chatbot" className="btn-primary">
          <MessageCircle size={17} />
          Chat Now
        </a>
      </section>

      <section className="cta-section">
        <div>
          <h2>Be Part of the Change</h2>
          <p>
            Get involved, make your voice heard, and help build a better campus
            for everyone.
          </p>
        </div>
        <a href="login" className="btn-outline">
          Students Hub <ChevronRight size={17} />
        </a>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/admin/login" className="brand-logo footer-brand-logo">
              <video src={ssgLogo} autoPlay loop muted playsInline />
              <span className="admin-hidden-link" aria-hidden="true">
                <Lock size={16} />
              </span>
            </Link>
          </div>

          <nav className="footer-nav">
            <a href="#home">Home</a>
            <a href="#clubs">Clubs</a>
            <a href="#events">Events</a>
            <a href="#announcements">Announcements</a>
            <a href="#forms">Forms</a>
            <a href="#chatbot">StudentHub AI</a>
          </nav>
        </div>

        <div className="footer-bottom">
          © 2026 StudentHub. All rights reserved.
        </div>
      </footer>

      <a href="#chatbot" className="chatbot-fab" aria-label="Open chatbot">
        <Bot size={24} />
      </a>
    </main>
  );
}