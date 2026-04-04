import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error("Register error:", error);
    }
    console.log("Register form submitted with data:", formData);
  };
  return (
    <div className="regist-container">
      <h1 className="brand-title">Penguin</h1>
      <p className="txt-regist">Don't have an account? No worries!</p>
      <div className="regist-card">
        <h2>Register</h2>
        <form className="regist-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="regist-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="regist-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="regist-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="regist-input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="regist-button">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;