import React, { useState } from "react";
import { addCandidate } from "../api";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

const AddCandidateForm = () => {
  const [candidate, setCandidate] = useState({
    candidateId: "",
    name: "",
    party: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await addCandidate(candidate);
      setSuccessMessage("✅ Candidate added successfully!");
      setCandidate({ candidateId: "", name: "", party: "" });
    } catch (error) {
      console.error("Add Candidate Error:", error);
      setErrorMessage("❌ Failed to add candidate. Try again.");
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        marginTop: "30px",
        padding: "25px",
        borderRadius: "10px",
        background: "#fdfdfd",
      }}
    >
      <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
        Add New Candidate
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
        <TextField
          label="Candidate ID"
          name="candidateId"
          value={candidate.candidateId}
          onChange={handleChange}
          required
        />
        <TextField
          label="Candidate Name"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Party"
          name="party"
          value={candidate.party}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ fontWeight: "bold" }}
        >
          Add Candidate
        </Button>
      </form>
    </Paper>
  );
};

export default AddCandidateForm;