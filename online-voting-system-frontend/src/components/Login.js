import React, { useState } from "react";
import { loginUser } from "../api";
import { TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      if (response.redirect) {
        localStorage.setItem("voterEmail", email);
        navigate("/verify-otp");
      } else {
        alert("Login Successful! Check your email for OTP.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f1f1f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "40px 30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Voter Login
        </Typography>

        {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography variant="body2" style={{ marginTop: "15px" }}>
          Not Registered? <Link to="/register">Register Here</Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
