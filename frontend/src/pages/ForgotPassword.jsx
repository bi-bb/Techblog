import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting forgot password for email:", email);
    alert("Submitting forgot password request. Check console for details."); // Debug alert

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Forgot password response:", data);

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(data.message || "Reset link sent successfully");
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Cannot connect to server");
    }
  };
  return (
    <div className="forgot-container">
      <h1 className="brand-title">Penguin</h1>
      <p className="txt-forgot">Forgot your password? No problem!</p>
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="forgot-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <button type="submit" className="forgot-button">
            Send Reset Link
          </button>
        </form>

        <p>
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;