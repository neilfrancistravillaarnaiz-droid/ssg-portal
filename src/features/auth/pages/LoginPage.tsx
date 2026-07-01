import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  ShieldCheck,
  LogIn,
  UserPlus,
  IdCard,
  SearchCheck,
} from "lucide-react";

import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import "../../../styles/auth.scss";

import { loginUser, signupUser, verifyStudent } from "../services/authService";

interface StudentRecord {
  student_id: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  program?: string;
  year_level?: string;
  section?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [studentId, setStudentId] = useState("");
  const [studentRecord, setStudentRecord] = useState<StudentRecord | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await loginUser(loginEmail, loginPassword);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/student/dashboard");
  };

  const handleVerifyStudent = async () => {
    setMessage("");
    setStudentRecord(null);
    setIsVerified(false);

    if (!studentId.trim()) {
      setMessage("Please enter your Student ID first.");
      return;
    }

    setVerifying(true);

    try {
      const result = await verifyStudent(studentId.trim());

      setStudentRecord(result.student);
      setIsVerified(true);
      setSignupEmail(result.student.email || "");
      setMessage("Student verified successfully. You may now create your account.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Student ID was not found in the official student records."
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isVerified || !studentRecord) {
      setMessage("Please verify your Student ID first.");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signupUser(studentRecord.student_id, signupEmail, signupPassword);

      setMessage("Account created successfully. You may now sign in.");
      setIsSignup(false);

      setStudentId("");
      setStudentRecord(null);
      setIsVerified(false);
      setSignupEmail("");
      setSignupPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    studentRecord?.full_name ||
    `${studentRecord?.first_name || ""} ${studentRecord?.middle_name || ""} ${
      studentRecord?.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim();

  return (
    <main className="auth-page">
      <div className={`auth-container ${isSignup ? "active" : ""}`}>
        <div className="overlay-panel">
          <div className="overlay-top">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="brand-row">
              <div className="brand-mark">
                <video src={ssgLogo} autoPlay loop muted playsInline />
              </div>
              <div>
                <div className="brand-name">StudentHub</div>
                <div className="brand-tag">The official digital platform for student services.</div>
              </div>
            </div>
          </div>

          <div className="overlay-body">
            <div className="badge">
              <ShieldCheck size={14} />
              Secure Student Access
            </div>

            <div className="overlay-text">
              <h2 className="overlay-title">
                {isSignup ? "Join " : "Welcome "}
                <span>{isSignup ? "StudentHub" : "back!"}</span>
              </h2>
              <p className="overlay-sub">
                {isSignup
                  ? "Create your account to access announcements, events, forms, printing requests, and more."
                  : "Sign in to access your dashboard, announcements, events, forms, printing requests, sanctions, and student services."}
              </p>
            </div>
          </div>
        </div>

        <div className="form-panel form-panel--login">
          <div className="form-inner">
            <span className="eyebrow">Sign in</span>
            <h1 className="form-title">Sign In</h1>
            <p className="form-sub">Enter your school account to continue.</p>

            {message && !isSignup && <p className="auth-alert">{message}</p>}

            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="student@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="row-between">
              <label className="checkbox-row">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="link">
                Forgot Password?
              </Link>
            </div>

            <button className="submit" type="submit" onClick={handleLogin} disabled={loading}>
              <LogIn size={16} />
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="switch-line">
              Don't have an account?
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsSignup(true);
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div className="form-panel form-panel--signup">
          <div className="form-inner">
            <span className="eyebrow">Create account</span>
            <h1 className="form-title">Create Account</h1>
            <p className="form-sub">Verify your Student ID before creating your account.</p>

            {message && isSignup && <p className="auth-alert">{message}</p>}

            <div className="field">
              <label>Student ID</label>
              <div className="input-wrap">
                <IdCard size={18} />
                <input
                  type="text"
                  placeholder="CCD-2025-00000"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setIsVerified(false);
                    setStudentRecord(null);
                    setSignupEmail("");
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="verify-btn"
              onClick={handleVerifyStudent}
              disabled={verifying}
            >
              <SearchCheck size={16} />
              {verifying ? "Checking..." : "Verify Student"}
            </button>

            {isVerified && studentRecord && (
              <div className="student-preview">
                <div>
                  <span>Full Name</span>
                  <strong>{fullName}</strong>
                </div>
                <div>
                  <span>Program</span>
                  <strong>{studentRecord.program}</strong>
                </div>
                <div>
                  <span>Year Level</span>
                  <strong>{studentRecord.year_level}</strong>
                </div>
                <div>
                  <span>Section</span>
                  <strong>{studentRecord.section}</strong>
                </div>
              </div>
            )}

            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  disabled={!isVerified}
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={!isVerified}
                />
                <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)}>
                  {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={!isVerified}
                />
              </div>
            </div>

            <button
              className="submit"
              type="submit"
              onClick={handleSignup}
              disabled={loading || !isVerified}
            >
              <UserPlus size={16} />
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="switch-line">
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsSignup(false);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}