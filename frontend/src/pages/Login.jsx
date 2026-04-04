import { Link } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("user", JSON.stringify(data));

       console.log("Role from backend:", data.role);

            if (data.role === "admin") {
              console.log("Go to admin dashboard");
              navigate("/admin/dashboard");
            } else {
              console.log("Go to home");
              navigate("/home");
}

    
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="login-container">
      <h1 className="brand-title">Penguin</h1>
      <p className="txt-welcome">Welcome to PENGUIN !!</p>
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
           <p>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </p>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

       
      </div>
    </div>
  );
}

export default Login;