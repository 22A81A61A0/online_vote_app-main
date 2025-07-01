import React, { useEffect, useState } from "react";
import { getCandidates } from "../api";
import {
  Paper, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, CircularProgress
} from "@mui/material";

const CandidateList = () => {  
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <Paper elevation={5} sx={{ padding: "20px", marginBottom: "30px" }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Candidate List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : candidates.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Party</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.candidateId}>
                <TableCell>{candidate.candidateId}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.party}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography sx={{ fontStyle: "italic", marginTop: "10px" }}>
          No candidates found.
        </Typography>
      )}
    </Paper>
  );
};

export default CandidateList;