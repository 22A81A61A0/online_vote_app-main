import React, { useEffect, useState } from "react";
import { getVoterInfo } from "../api";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [voter, setVoter] = useState(null);
    const email = localStorage.getItem("voterEmail");

    useEffect(() => {
        if (!email) {
            navigate("/register");
            return;
        }

        getVoterInfo(email)
            .then((data) => setVoter(data))
            .catch((error) => console.error("Error fetching voter:", error));
    }, [email, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("voterEmail");
        navigate("/");
    };

    return (
        <Container maxWidth="md" style={{ textAlign: "center", marginTop: "40px" }}>
            <Paper 
                elevation={6} 
                style={{
                    padding: "30px",
                    marginTop: "40px",
                    backgroundColor: "#F5F7FA",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                }}
            >
                <Typography 
                    variant="h4" 
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600", color: "#2C3E50", marginBottom: "15px" }}
                >
                    Hello, {voter ? voter.name : "Voter"}
                </Typography>

                {voter ? (
                    <Typography 
                        variant="body1" 
                        style={{ fontSize: "18px", fontFamily: "Arial, sans-serif", color: "#555" }}
                    >
                        <b>Email:</b> {voter.email} <br />
                        <b>MFA Enabled:</b> {voter.mfaEnabled ? "✅ Yes" : "❌ No"}
                    </Typography>
                ) : (
                    <Typography style={{ fontSize: "18px", color: "#777" }}>Loading...</Typography>
                )}

                <Button
                    onClick={() => navigate("/ballot")}
                    variant="contained"
                    style={{
                        marginTop: "20px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "8px"
                    }}
                >
                    Vote Now
                </Button>

                <Button 
                    onClick={handleLogout} 
                    variant="contained" 
                    style={{
                        marginTop: "20px",
                        marginLeft: "10px",
                        backgroundColor: "#8E44AD",
                        color: "#fff",
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#6C3483"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#8E44AD"}
                >
                    LOGOUT
                </Button>
            </Paper>
        </Container>
    );
};

export default Dashboard;