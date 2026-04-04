import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="reset-container">
      <h1 className="brand-title">Penguin</h1>
      <p className="txt-reset">Hey, let's reset your password!</p>
        

      <div className="reset-card">
        <h2>Reset Password</h2>

        <form className="reset-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="reset-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>

        <p>
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;