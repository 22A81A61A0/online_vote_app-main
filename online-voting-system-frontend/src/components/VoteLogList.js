import React, { useEffect, useState } from "react";
import { getVoteLogs } from "../api";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

const VoteLogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getVoteLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching vote logs:", error);
      setError("Failed to fetch vote logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        sx={{ padding: "20px", marginBottom: "30px", width: "100%", maxWidth: "900px" }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Vote Logs (Audit Trail)
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : logs.length > 0 ? (
          <Table
            sx={{
              minWidth: "100%",
              border: "1px solid #ddd",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Voter ID</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Candidate ID</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.voterId}</TableCell>
                  <TableCell>{log.candidateId ? log.candidateId : "N/A"}</TableCell>
                  <TableCell>
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleString("en-IN")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography sx={{ fontStyle: "italic", marginTop: "10px" }}>
            No vote logs found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default VoteLogList;
