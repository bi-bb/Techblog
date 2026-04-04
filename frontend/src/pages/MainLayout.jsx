import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="home-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;