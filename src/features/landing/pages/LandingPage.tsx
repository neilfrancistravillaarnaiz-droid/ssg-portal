import { Link } from "react-router-dom";
import {
  Bell,
  Bot,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Megaphone,
  MessageCircle,
  Printer,
  Send,
  ShieldCheck,
  Users,
  Zap,
  Code2,
  Leaf,
  Camera,
  Trophy,
  ChevronRight,
  Upload,
  Lock,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import "../../../styles/landing.scss";

const stats = [
  { number: "1,250+", label: "Active Students", icon: Users },
  { number: "12+", label: "Registered Clubs", icon: GraduationCap },
  { number: "48", label: "Upcoming Events", icon: CalendarDays },
  { number: "120+", label: "Announcements", icon: Megaphone },
];

const features = [
  {
    title: "Real-time Updates",
    description: "Get the latest news and announcements instantly.",
    icon: Bell,
    color: "blue",
  },
  {
    title: "Community Driven",
    description: "Connect with students and build lasting relationships.",
    icon: Users,
    color: "sky",
  },
  {
    title: "Secure & Reliable",
    description: "Your data and privacy are our top priority.",
    icon: ShieldCheck,
    color: "teal",
  },
  {
    title: "Easy to Use",
    description: "A simple and intuitive platform for everyone.",
    icon: Zap,
    color: "orange",
  },
];

const clubs = [
  {
    name: "Coding Club",
    description: "Empowering students through code.",
    members: "120 Members",
    icon: Code2,
    color: "navy",
  },
  {
    name: "Environment Club",
    description: "Building a greener and sustainable campus.",
    members: "98 Members",
    icon: Leaf,
    color: "green",
  },
  {
    name: "Photography Club",
    description: "Capturing moments, creating memories.",
    members: "75 Members",
    icon: Camera,
    color: "purple",
  },
  {
    name: "Sports Club",
    description: "Play hard, train harder, together.",
    members: "110 Members",
    icon: Trophy,
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
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="brand-logo">
              <video src={ssgLogo} autoPlay loop muted playsInline />
            </div>
            <div>
              <h3>StudentHub</h3>
              <span>Student Services Portal</span>
            </div>
          </div>

          <div className="nav-links">
            <a href="#home" className="active">
              Home
            </a>
            <a href="#features">About Us</a>
            <a href="#clubs">Clubs</a>
            <a href="#events">Events</a>
            <a href="#announcements">Announcements</a>
            <a href="#forms">Forms</a>
          </div>

          <Link to="login" className="nav-cta">
            Get Started <ChevronRight size={17} />
          </Link>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-pattern" />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <ShieldCheck size={14} />
              Empowering Students
            </div>

            <h1>
              Your Campus. <br />
              Your Voice. <br />
              <span>Your Future.</span>
            </h1>

            <p>
              The official digital platform for student services, organizations,
              and governance. Stay informed, connected, and involved in building
              a better campus community.
            </p>

            <div className="hero-actions">
              <a href="#features" className="btn-primary">
                Explore More <ChevronRight size={17} />
              </a>
              <a href="#announcements" className="btn-outline">
                View Announcements
              </a>
            </div>
          </div>

          <div className="hero-right">
            <a href="#announcements" className="hero-info-card">
              <div className="info-icon blue">
                <Megaphone size={23} />
              </div>
              <div>
                <h4>Latest Announcements</h4>
                <p>Stay updated with important news and reminders.</p>
              </div>
            </a>

            <a href="#clubs" className="hero-info-card">
              <div className="info-icon sky">
                <Users size={23} />
              </div>
              <div>
                <h4>Active Clubs</h4>
                <p>Join organizations and discover opportunities.</p>
              </div>
            </a>

            <a href="#events" className="hero-info-card">
              <div className="info-icon teal">
                <CalendarDays size={23} />
              </div>
              <div>
                <h4>Upcoming Events</h4>
                <p>Never miss an event that matters to you.</p>
              </div>
            </a>

            <a href="#forms" className="hero-info-card">
              <div className="info-icon orange">
                <ClipboardList size={23} />
              </div>
              <div>
                <h4>Easy Forms</h4>
                <p>Submit requests and documents in a few clicks.</p>
              </div>
            </a>
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
                <Icon size={34} />
                <div>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading center">
          <span>Why Choose StudentHub</span>
          <h2>Everything you need in one place</h2>
          <p>
            Designed to make your campus life easier, more connected, and more
            meaningful.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="feature-card" key={feature.title}>
                <div className={`feature-icon ${feature.color}`}>
                  <Icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="clubs-section" id="clubs">
        <div className="clubs-layout">
          <div className="clubs-copy">
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

          <div className="clubs-grid">
            {clubs.map((club) => {
              const Icon = club.icon;
              return (
                <div className="club-card" key={club.name}>
                  <div className={`club-icon ${club.color}`}>
                    <Icon size={30} />
                  </div>
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <strong>{club.members}</strong>
                </div>
              );
            })}
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
                <button>RSVP</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="forms-section" id="forms">
        <div className="section-heading center">
          <span>Student Forms</span>
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
          Get Started <ChevronRight size={17} />
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
            <div>
              <h3>StudentHub</h3>
              <p>
                The official digital platform for student services,
                organizations, and governance.
              </p>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#features">About Us</a>
              <a href="#clubs">Clubs</a>
              <a href="#events">Events</a>
            </div>

            <div>
              <h4>Services</h4>
              <a href="#announcements">Announcements</a>
              <a href="#forms">Forms</a>
              <a href="#chatbot">StudentHub AI</a>
              <a href="#features">FAQ</a>
            </div>

            <div>
              <h4>Follow Us</h4>
              <div className="social-row">
                <a href="#home" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#home" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#home" aria-label="Message">
                  <Send size={15} />
                </a>
              </div>
            </div>
          </div>
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