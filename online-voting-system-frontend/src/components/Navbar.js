import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ color: "#fff", fontSize: "24px", fontWeight: "600", fontFamily: "Montserrat, sans-serif" }}>
        Online Voting System
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin-login" style={navLinkStyle}>Admin Login</Link>
        <Link to="/login" style={navLinkStyle}>User Login</Link>
        <Link to="/register" style={navLinkStyle}>Register</Link>
      </div>

      <div style={{
        backgroundColor: "#ffffff",
        padding: "8px 12px",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "180px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ color: "#333", fontSize: "12px", fontFamily: "Montserrat, sans-serif" }}>{currentDate}</div>
        <div style={{ color: "#333", fontSize: "18px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>{currentTime}</div>
      </div>
    </div>
  );
};

// Common link style
const navLinkStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontFamily: "Montserrat, sans-serif",
  textDecoration: "none",
  fontSize: "14px"
};

export default Navbar;
