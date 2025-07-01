import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell,
  TableBody, Snackbar, Alert, CircularProgress, Drawer, List, ListItem,
  ListItemText, ListItemIcon, AppBar, Toolbar, Container
} from "@mui/material";

import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BallotIcon from '@mui/icons-material/Ballot';

import { useNavigate } from "react-router-dom";
import AddCandidateForm from "./AddCandidateForm";
import CandidateList from "./CandidateList";
import VoteLogList from "./VoteLogList";
import VoteResults from "./VoteResults"; // ✅ Make sure this is imported
import { getPendingVoters, approveVoter, getSecurityLogs } from "../api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingVoters, setPendingVoters] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loadingVoters, setLoadingVoters] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [activeTab, setActiveTab] = useState("approvals");

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    fetchVoters();
    fetchSecurityLogs();
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric"
      }));
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", hour12: true
      }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchVoters = async () => {
    try {
      setLoadingVoters(true);
      const data = await getPendingVoters();
      setPendingVoters(data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoadingVoters(false);
    }
  };

  const fetchSecurityLogs = async () => {
    try {
      setLoadingLogs(true);
      const logs = await getSecurityLogs();
      setSecurityLogs(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleApprove = async (email) => {
    try {
      await approveVoter(email);
      setPendingVoters(pendingVoters.filter(voter => voter.email !== email));
      setSuccessMessage("Voter approved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ width: `calc(100% - 200px)`, ml: "200px", background: "linear-gradient(135deg, #2193b0, #6dd5ed)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
          <Typography variant="h5" sx={{ fontFamily: "Montserrat", fontWeight: 600, color: "#fff" }}>
            Online Voting System
          </Typography>
          <Box sx={{ background: "#fff", padding: "10px 15px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 500 }}>{currentDate}</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>{currentTime}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box display="flex">
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
          }}
        >
          <Typography variant="h6" sx={{ padding: "15px", fontWeight: "bold", color: "#1976d2" }}>
            Admin Menu
          </Typography>
          <List>
            <ListItem button onClick={() => setActiveTab("approvals")} selected={activeTab === "approvals"}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Pending Approvals" />
            </ListItem>
            <ListItem button onClick={() => setActiveTab("logs")} selected={activeTab === "logs"}>
              <ListItemIcon><SecurityIcon /></ListItemIcon>
              <ListItemText primary="Security Logs" />
            </ListItem>
            <ListItem button onClick={() => setActiveTab("addCandidate")} selected={activeTab === "addCandidate"}>
              <ListItemIcon><HowToVoteIcon /></ListItemIcon>
              <ListItemText primary="Add Candidate" />
            </ListItem>
            <ListItem button onClick={() => setActiveTab("viewCandidates")} selected={activeTab === "viewCandidates"}>
              <ListItemIcon><VisibilityIcon /></ListItemIcon>
              <ListItemText primary="View Candidates" />
            </ListItem>
            <ListItem button onClick={() => setActiveTab("voteLogs")} selected={activeTab === "voteLogs"}>
              <ListItemIcon><BallotIcon /></ListItemIcon>
              <ListItemText primary="Vote Logs" />
            </ListItem>
            <ListItem button onClick={() => setActiveTab("voteResults")} selected={activeTab === "voteResults"}>
              <ListItemIcon><HowToVoteIcon /></ListItemIcon>
              <ListItemText primary="Vote Results" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>

        <Container maxWidth="lg" sx={{ marginLeft: "220px", paddingTop: "100px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "900px" }}>
              {activeTab === "approvals" && (
                <Paper elevation={5} sx={{ padding: "20px", marginBottom: "30px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    Pending Voter Approvals
                  </Typography>
                  {loadingVoters ? (
                    <CircularProgress />
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: "#1976d2" }}>
                          <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                          <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                          <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Approve</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pendingVoters.length > 0 ? pendingVoters.map((voter) => (
                          <TableRow key={voter.email}>
                            <TableCell>{voter.name}</TableCell>
                            <TableCell>{voter.email}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#2e7d32", color: "#fff" }}
                                onClick={() => handleApprove(voter.email)}
                              >
                                Approve
                              </Button>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={3} sx={{ textAlign: "center", fontStyle: "italic" }}>
                              No pending approvals
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </Paper>
              )}

              {activeTab === "logs" && (
                <Paper elevation={5} sx={{ padding: "20px", marginBottom: "30px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    Security Logs (Failed Logins)
                  </Typography>
                  {loadingLogs ? (
                    <CircularProgress />
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#ffcc00" }}>
                          <TableCell sx={{ fontWeight: "bold", color: "#333" }}>User ID</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Action</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Timestamp</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {securityLogs.length > 0 ? securityLogs.map((log, index) => (
                          <TableRow key={index}>
                            <TableCell>{log.userId}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.timestamp}</TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={3} sx={{ textAlign: "center", fontStyle: "italic" }}>
                              No failed login attempts
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </Paper>
              )}

              {activeTab === "addCandidate" && <AddCandidateForm />}
              {activeTab === "viewCandidates" && <CandidateList />}
              {activeTab === "voteLogs" && <VoteLogList />}
              {activeTab === "voteResults" && <VoteResults />} {/* ✅ Added this */}

              <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                  {successMessage}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
