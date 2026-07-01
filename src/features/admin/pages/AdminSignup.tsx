import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";
import "../../../styles/auth.scss";
import { signupAdmin } from "../../auth/services/authService";

export default function AdminSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signupAdmin(email, password);
      setLoading(false);
      navigate("/admin/login", {
        state: { infoMessage: "Admin account created. Please sign in." },
      });
    } catch (error) {
      setLoading(false);
      setMessage(error instanceof Error ? error.message : "Unable to create admin account.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container admin-login-page">
        <div className="overlay-panel">
          <div className="overlay-top">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="brand-row">
              <div className="brand-mark admin-mark">A</div>
              <div>
                <div className="brand-name">Admin Hub</div>
                <div className="brand-tag">Secure administration portal for StudentHub.</div>
              </div>
            </div>
          </div>

          <div className="overlay-body">
            <div className="badge">
              <UserPlus size={14} />
              Admin signup
            </div>

            <div className="overlay-text">
              <h2 className="overlay-title">Create your admin account</h2>
              <p className="overlay-sub">
                Set up your administrator access and manage student services from the secure portal.
              </p>
            </div>
          </div>
        </div>

        <div className="form-panel form-panel--login admin-form-panel">
          <div className="form-inner">
            <span className="eyebrow">Admin Registration</span>
            <h1 className="form-title">Sign Up</h1>
            <p className="form-sub">Create an admin account with your administrator email and a secure password.</p>

            {message && <p className="auth-alert">{message}</p>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    minLength={6}
                    required
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
              <Link to="/admin/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
