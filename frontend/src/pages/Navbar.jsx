import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
return (
    <nav className="custom-navbar">
        <div className="nav-left">
          <Link to="/home" className="logo">
            Penguin
          </Link>
        </div>

        <div className="nav-center">
          <Link to="/home" className="nav-link active">
            Home
          </Link>
          <Link to="/category" className="nav-link">
            Category
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/search" className="icon-link">
            <span className="material-symbols-outlined">search</span>
          </Link>
          <Link to="/notifications" className="icon-link">
            <span className="material-symbols-outlined">notifications</span>
          </Link>
        </div>

        <span className="welcome-message">Hi, {user?.name}!</span>

        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>    
      );}
      export default Navbar;