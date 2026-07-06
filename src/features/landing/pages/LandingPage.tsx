import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  CalendarDays,
  FileText,
  GraduationCap,
  Megaphone,
  MessageCircle,
  Printer,
  Users,
  ChevronRight,
  Upload,
  Lock,
} from "lucide-react";
import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import creativeVisionariesLogo from "../../../assets/logos/CV.jpg";
import techedLogo from "../../../assets/logos/TECHED.jpg";
import udsuhanLogo from "../../../assets/logos/UDSUHAN.jpg";
import eceaLogo from "../../../assets/logos/ECEA.jpg";
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
    description: "Most active club in creative programming and student showcases.",
    members: "150 Members",
    image: creativeVisionariesLogo,
    color: "navy",
  },
  {
    name: "TechEd Innovators Club",
    description: "Leading campus tech workshops and innovation challenges.",
    members: "130 Members",
    image: techedLogo,
    color: "green",
  },
  {
    name: "Udsuhan Dance Club",
    description: "High-energy performances and regular dance events year-round.",
    members: "95 Members",
    image: udsuhanLogo,
    color: "purple",
  },
  {
    name: "ECEA",
    description: "Driving academic engagement and campus-wide student initiatives.",
    members: "110 Members",
    image: eceaLogo,
    color: "orange",
  },
];

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
      key: "announcements",
      title: "Featured Announcements",
      subtitle: "Stay informed with the latest campus updates.",
      type: "announcements",
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
            <div key={slide.key} className={`hero-slide ${activeSlide === index ? "active" : ""}`}>
              {slide.type === "video" ? (
                <div className="hero-video-wrap">
                  <video className="hero-video-bg" src={ssgLogo} autoPlay loop muted playsInline preload="auto" />
                </div>
              ) : slide.type === "announcements" ? (
                <div className="hero-content-card">
                  <span className="slide-label">Featured Announcements</span>
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <div className="announcement-list">
                    {announcements.slice(0, 2).map((item) => {
                      const Icon = item.icon;
                      return (
                        <div className="announcement-card" key={item.title}>
                          <div className="announcement-icon">
                            <Icon size={20} />
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
            {slides.map((_, index) => (
              <button
                key={index}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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

      <section className="clubs-section" id="clubs">
        <div className="clubs-layout">
          <div className="clubs-copy">
            <div className="clubs-spacer left" aria-hidden="true" />
            <span>Our Community</span>
            <h2>Explore Student Clubs</h2>
            <p>
              Join clubs, discover your passions, and be part of a community
              that inspires you.
            </p>
            <a href="#clubs" className="btn-primary">
              View All Clubs <ChevronRight size={17} />
            </a>
          </div>

          <div className="clubs-right">
            <div className="clubs-right-header">
              <div className="clubs-spacer right" aria-hidden="true" />
              <span>Most Active Clubs This Year</span>
              <h3>Top Student Organizations of 2026</h3>
            </div>

            <div className="clubs-grid">
              {clubs.map((club) => (
                <div className="club-card" key={club.name}>
                  <div className="club-icon">
                    {club.image && <img src={club.image} alt={`${club.name} logo`} />}
                  </div>
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <strong>{club.members}</strong>
                </div>
              ))}
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
              const Icon = item.icon;
              return (
                <div className="announcement-item" key={item.title}>
                  <div className={`update-icon ${item.color}`}>
                    <Icon size={21} />
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