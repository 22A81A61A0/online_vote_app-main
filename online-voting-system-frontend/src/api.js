import axios from "axios";

// 🌐 Base URL of your deployed backend on Render
const BASE_URL = "https://online-vote-app-main.onrender.com";

// 🗳️ API endpoints
const VOTER_API_BASE_URL = `${BASE_URL}/api/voter`;
const ADMIN_API_BASE_URL = `${BASE_URL}/api/admin`;
const CANDIDATE_API_BASE_URL = `${BASE_URL}/api/candidates`;
const VOTE_API_BASE_URL = `${BASE_URL}/api/admin`;

// ✅ Get Vote Results
export const getVoteResults = async () => {
  const response = await axios.get(`${VOTE_API_BASE_URL}/results`);
  return response;
};

// ✅ Voter Registration
export const registerVoter = async (voterData) => {
  const response = await axios.post(`${VOTER_API_BASE_URL}/register`, voterData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ OTP Verification
export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${VOTER_API_BASE_URL}/verify-otp`, null, {
    params: { email, otp },
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Get Voter Info
export const getVoterInfo = async (email) => {
  const response = await axios.get(`${VOTER_API_BASE_URL}/get-voter`, {
    params: { email },
  });
  return response.data;
};

// ✅ Voter Login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${VOTER_API_BASE_URL}/login`, null, {
    params: { email, password },
  });
  return response.data;
};

// ✅ Admin Login
export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${ADMIN_API_BASE_URL}/login`, null, {
    params: { email, password },
  });
  return response.data;
};

// ✅ Admin Get Pending Voters
export const getPendingVoters = async () => {
  const response = await axios.get(`${ADMIN_API_BASE_URL}/pending-voters`);
  return response.data;
};

// ✅ Admin Approve Voter
export const approveVoter = async (email) => {
  await axios.post(`${ADMIN_API_BASE_URL}/approve-voter`, null, {
    params: { email },
  });
};

// ✅ Get Unapproved Voters (if API available)
export const getUnapprovedVoters = async () => {
  const response = await axios.get(`${ADMIN_API_BASE_URL}/unapproved`);
  return response.data;
};

// ✅ Admin Get Security Logs
export const getSecurityLogs = async () => {
  const response = await axios.get(`${ADMIN_API_BASE_URL}/security-logs`);
  return response.data;
};

// ✅ Cast Vote (with JSON body)
export const castVote = async (voterId, candidateId) => {
  const response = await axios.post(`${VOTE_API_BASE_URL}/cast`, {
    voterId,
    candidateId,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// ✅ Add Candidate
export const addCandidate = async (candidateData) => {
  const response = await axios.post(`${CANDIDATE_API_BASE_URL}/add`, candidateData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Get Candidates
export const getCandidates = async () => {
  const response = await axios.get(`${CANDIDATE_API_BASE_URL}`);
  return response.data;
};

// ✅ Get Vote Logs
export const getVoteLogs = async () => {
  const response = await axios.get(`${VOTE_API_BASE_URL}/logs`);
  return response.data;
};
