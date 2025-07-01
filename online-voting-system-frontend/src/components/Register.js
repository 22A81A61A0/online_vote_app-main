import React, { useState } from "react";
import { registerVoter } from "../api";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [voter, setVoter] = useState({
    voterId: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVoter({ ...voter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { voterId, name, email, password } = voter;
    if (!voterId || !name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await registerVoter(voter);
      localStorage.setItem("voterEmail", voter.email);
      alert("Registration successful! Check your email for OTP.");
      navigate("/verify-otp");
    } catch (err) {
      console.error("Registration failed:", err);
      const backendMsg = err.response?.data;
      setError(backendMsg || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
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
          maxWidth: "450px",
          textAlign: "center",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Voter Registration
        </Typography>

        {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <TextField
            label="Voter ID"
            name="voterId"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            label="Full Name"
            name="name"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography variant="body2" style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login">Login Here</Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
