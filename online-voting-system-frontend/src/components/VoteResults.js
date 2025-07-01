import React, { useEffect, useState } from "react";
import { getVoteResults } from "../api";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const VoteResults = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await getVoteResults();
      const data = response.data;

      setResults(data);

      // Determine winner
      const entries = Object.entries(data);
      if (entries.length > 0) {
        const sorted = entries.sort((a, b) => b[1] - a[1]);
        setWinner(sorted[0][0]);
      }
    } catch (error) {
      console.error("Error fetching vote results:", error);
      setError("Failed to fetch vote results.");
    } finally {
      setLoading(false);
    }
  };

  // Convert result object to chart-friendly format
  const chartData = Object.entries(results).map(([id, votes]) => ({
    candidateId: id,
    votes,
  }));

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        sx={{ padding: "30px", marginBottom: "30px", width: "100%", maxWidth: "800px" }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Vote Results
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="candidateId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>

            <Typography
              variant="h6"
              sx={{
                marginTop: "30px",
                backgroundColor: "#e3f2fd",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              🎉 Winner: Candidate {winner}
            </Typography>
          </>
        ) : (
          <Typography sx={{ fontStyle: "italic", marginTop: "10px" }}>
            No votes yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default VoteResults;
