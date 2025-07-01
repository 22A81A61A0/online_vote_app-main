import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to the Online Voting System</h1>
        <p style={styles.subtitle}>
          Vote securely, transparently, and easily from anywhere!
        </p>

        {/* ✅ Get Started Button */}
        <button style={styles.ctaButton} onClick={() => navigate("/register")}>
          Get Started
        </button>

        {/* ✅ How It Works Section */}
        <div style={styles.stepsSection}>
          <h2 style={styles.sectionTitle}>How It Works</h2>

          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <span style={styles.emoji}>📝</span>
              <h3 style={styles.stepTitle}>Register</h3>
              <p style={styles.stepDesc}>Create your account with verified email and details.</p>
            </div>
            <div style={styles.stepCard}>
              <span style={styles.emoji}>🔐</span>
              <h3 style={styles.stepTitle}>Login</h3>
              <p style={styles.stepDesc}>Login securely using your credentials and OTP.</p>
            </div>
            <div style={styles.stepCard}>
              <span style={styles.emoji}>🗳️</span>
              <h3 style={styles.stepTitle}>Cast Vote</h3>
              <p style={styles.stepDesc}>Choose your candidate and submit your vote anonymously.</p>
            </div>
            <div style={styles.stepCard}>
              <span style={styles.emoji}>📊</span>
              <h3 style={styles.stepTitle}>View Results</h3>
              <p style={styles.stepDesc}>Check real-time results and winner announcement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundImage: 'url("/images/bg-vote.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    overflowY: "auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#000",
    marginBottom: "30px",
  },
  ctaButton: {
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "40px",
  },
  stepsSection: {
    maxWidth: "1000px",
    width: "100%",
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  stepCard: {
    backgroundColor: "#ffffffcc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  emoji: {
    fontSize: "30px",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0 5px",
    color: "#333",
  },
  stepDesc: {
    fontSize: "14px",
    color: "#555",
  },
};

export default HomePage;
