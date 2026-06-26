import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Forgot Password</h1>
      <p>This page will be designed next.</p>
      <Link to="/login">Back to Login</Link>
    </main>
  );
}