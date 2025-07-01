import React, { useEffect, useState } from "react";
import { getCandidates, castVote } from "../api";
import {
  Container, Typography, Paper, FormControlLabel,
  Radio, RadioGroup, Button, Alert, CircularProgress, Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Ballot = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("voterEmail");

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const loadCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (err) {
        setError("⚠️ Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [email, navigate]);

  const handleVote = async () => {
    setError("");
    setMessage("");

    try {
      await castVote(email, selectedCandidate);
      setMessage("✅ Your vote was successfully cast.");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "❌ Voting failed. You may have already voted.";
      setError(errorMsg);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Paper
        elevation={6}
        style={{
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Cast Your Vote
        </Typography>

        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress color="primary" />
          </div>
        ) : candidates.length > 0 ? (
          <>
            <RadioGroup
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              style={{ textAlign: "left", paddingLeft: "10px" }}
            >
              {candidates.map((candidate) => (
                <FormControlLabel
                  key={candidate.candidateId}
                  value={candidate.candidateId}
                  control={<Radio />}
                  label={`${candidate.name} (${candidate.party})`}
                />
              ))}
            </RadioGroup>

            <Divider style={{ margin: "20px 0" }} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVote}
              disabled={!selectedCandidate}
              style={{ marginBottom: "10px", fontWeight: "bold" }}
            >
              Submit Vote
            </Button>
          </>
        ) : (
          <Typography variant="body1" style={{ color: "#777" }}>
            No candidates available.
          </Typography>
        )}

        {message && <Alert severity="success" style={{ marginTop: "15px" }}>{message}</Alert>}
        {error && <Alert severity="error" style={{ marginTop: "15px" }}>{error}</Alert>}

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            borderColor: "#ccc",
            color: "#444"
          }}
        >
          ⬅ Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default Ballot;
