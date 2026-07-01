import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ssgLogo from "../../../assets/logos/logo-ssg.mp4";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  ShieldCheck,
  LogIn,
  UserPlus,
} from "lucide-react";
import "../../../styles/auth.scss";
import { loginUser, signupAdmin, verifyAdminOtp, generateAdminOtp, resendAdminOtp } from "../../auth/services/authService";

interface Props {
  initialSignup?: boolean;
}

export default function AdminLogin({ initialSignup = false }: Props) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(initialSignup);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpVerificationRequired, setOtpVerificationRequired] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await loginUser(loginEmail, loginPassword);

    if (error) {
      setMessage(error.message || "Unable to sign in.");
      setLoading(false);
      return;
    }

    try {
      await generateAdminOtp(loginEmail, loginPassword);
      setLoading(false);
      setOtpVerificationRequired(true);
      setMessage("Please check your email for the verification code.");
    } catch (err) {
      setLoading(false);
      setMessage(err instanceof Error ? err.message : "Unable to send OTP.");
    }
  };

  const handleVerifyLoginOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await verifyAdminOtp(loginEmail, loginOtp);
      setLoading(false);
      setOtpVerificationRequired(false);
      setLoginOtp("");
      navigate("/admin/dashboard");
    } catch (error) {
      setLoading(false);
      setMessage(error instanceof Error ? error.message : "Unable to verify OTP.");
    }
  };

  const handleResendOtp = async () => {
    setMessage("");
    setResendLoading(true);

    try {
      await resendAdminOtp(loginEmail, loginPassword);
      setResendLoading(false);
      setMessage("OTP resent to your email.");
    } catch (error) {
      setResendLoading(false);
      setMessage(error instanceof Error ? error.message : "Unable to resend OTP.");
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (signupPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await signupAdmin(signupEmail, signupPassword);
      setLoading(false);
      setSignupEmail("");
      setSignupPassword("");
      setConfirmPassword("");
      setIsSignup(false);
      setMessage(result.message || "Admin account created. Please sign in.");
    } catch (error) {
      setLoading(false);
      setMessage(error instanceof Error ? error.message : "Unable to create admin account.");
    }
  };

  return (
    <main className="auth-page">
      <div className={`auth-container ${isSignup ? "active" : ""} admin-login-page`}>
        <div className="overlay-panel">
          <div className="overlay-top">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="brand-row">
              <div className="brand-mark admin-mark brand-logo-video">
                <video src={ssgLogo} autoPlay loop muted playsInline />
              </div>
              <div>
                <div className="brand-name">Admin Hub</div>
                <div className="brand-tag">Secure administration portal for StudentHub.</div>
              </div>
            </div>
          </div>

          <div className="overlay-body">
            <div className="badge">
              {isSignup ? <UserPlus size={14} /> : <ShieldCheck size={14} />}
              {isSignup ? "Create admin account" : "Admin access only"}
            </div>

            <div className="overlay-text">
              <h2 className="overlay-title">
                {isSignup ? "Create " : "Welcome back"}
                <span>{isSignup ? "Admin Hub" : "back"}</span>
              </h2>
              <p className="overlay-sub">
                {isSignup
                  ? "Create your administrator account to manage students, presidents, and platform operations."
                  : "Sign in with your administrator credentials to manage students, presidents, and platform operations."}
              </p>
            </div>
          </div>
        </div>

        <div className="form-panel form-panel--login admin-form-panel">
          <div className="form-inner">
            <span className="eyebrow">Admin Sign In</span>
            <h1 className="form-title">Admin Login</h1>
            <p className="form-sub">Enter your administrator credentials to continue.</p>

            {message && !isSignup && <p className="auth-alert">{message}</p>}

            <form onSubmit={otpVerificationRequired ? handleVerifyLoginOtp : handleLogin}>
              {!otpVerificationRequired && (
                <>
                  <div className="field">
                    <label>Email Address</label>
                    <div className="input-wrap">
                      <Mail size={18} />
                      <input
                        type="email"
                        placeholder="admin@email.com"
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
                </>
              )}

              {otpVerificationRequired && (
                <div className="field">
                  <label>Verification Code</label>
                  <div className="input-wrap">
                    <ShieldCheck size={18} />
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
              )}

              <button className="submit" type="submit" disabled={loading}>
                <LogIn size={16} />
                {loading ? (otpVerificationRequired ? "Verifying OTP..." : "Signing in...") : otpVerificationRequired ? "Verify OTP" : "Sign In"}
              </button>

              {otpVerificationRequired && (
                <button 
                  className="submit secondary" 
                  type="button" 
                  onClick={handleResendOtp} 
                  disabled={resendLoading}
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </form>

            <div className="switch-line">
              Don’t have an admin account?
              <button type="button" onClick={() => setIsSignup(true)}>
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div className="form-panel form-panel--signup admin-form-panel">
          <div className="form-inner">
            <span className="eyebrow">Admin Registration</span>
            <h1 className="form-title">Create Account</h1>
            <p className="form-sub">Register your admin account to access the secure admin portal.</p>

            {message && isSignup && <p className="auth-alert">{message}</p>}

            <form onSubmit={handleSignup}>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="admin@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <Lock size={18} />
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Enter a secure password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
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
                  />
                </div>
              </div>

              <button className="submit" type="submit" disabled={loading}>
                <UserPlus size={16} />
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="switch-line">
              Already have an admin account?
              <button type="button" onClick={() => setIsSignup(false)}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
