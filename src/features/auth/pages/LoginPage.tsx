import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  ShieldCheck,
  LogIn,
  UserPlus,
  User,
  IdCard,
} from "lucide-react";

import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import "../../../styles/auth.scss";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <main className="auth-page">
      <div className="auth-left">
        <Link to="/" className="back-home">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="auth-brand">
          <div className="auth-logo">
            <video src={ssgLogo} autoPlay loop muted playsInline />
          </div>

          <div>
            <h1>StudentHub</h1>
            <p>The official digital platform for student services.</p>
          </div>
        </div>

        <div className="auth-message">
          <span>
            <ShieldCheck size={16} />
            Secure Student Access
          </span>

          <h2>{isSignup ? "Create your account." : "Welcome back!"}</h2>
          <p>
            {isSignup
              ? "Register your StudentHub account to access announcements, forms, clubs, events, and student services."
              : "Sign in to access your dashboard, announcements, events, forms, printing requests, sanctions, and student services."}
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className={`auth-flip-card ${isSignup ? "flipped" : ""}`}>
          <div className="auth-card-inner">
            {/* LOGIN */}
            <form className="login-card auth-card-front">
              <div className="login-header">
                <h2>Sign In</h2>
                <p>Enter your school account to continue.</p>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-box">
                  <Mail size={18} />
                  <input type="email" placeholder="student@email.com" />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-box">
                  <Lock size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button className="login-btn" type="submit">
                <LogIn size={18} />
                Sign In
              </button>

              <p className="switch-auth">
                Don’t have an account?{" "}
                <button type="button" onClick={() => setIsSignup(true)}>
                  Create Account
                </button>
              </p>
            </form>

            {/* SIGNUP */}
            <form className="login-card auth-card-back">
              <div className="login-header">
                <h2>Create Account</h2>
                <p>Register your StudentHub student account.</p>
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <div className="input-box">
                  <User size={18} />
                  <input type="text" placeholder="Enter your full name" />
                </div>
              </div>

              <div className="input-group">
                <label>Student ID</label>
                <div className="input-box">
                  <IdCard size={18} />
                  <input type="text" placeholder="Enter your student ID" />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-box">
                  <Mail size={18} />
                  <input type="email" placeholder="student@email.com" />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-box">
                  <Lock size={18} />
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowSignupPassword(!showSignupPassword)
                    }
                  >
                    {showSignupPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button className="login-btn" type="submit">
                <UserPlus size={18} />
                Create Account
              </button>

              <p className="switch-auth">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsSignup(false)}>
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}