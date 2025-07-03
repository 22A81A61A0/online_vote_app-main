package com.sau.onlinevoting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sau.onlinevoting.model.Admin;
import com.sau.onlinevoting.model.SecurityLog;
import com.sau.onlinevoting.model.Vote;
import com.sau.onlinevoting.model.VoteLog;
import com.sau.onlinevoting.model.Voter;
import com.sau.onlinevoting.repository.AdminRepository;
import com.sau.onlinevoting.repository.SecurityLogRepository;
import com.sau.onlinevoting.repository.VoteLogRepository;
import com.sau.onlinevoting.repository.VoteRepository;
import com.sau.onlinevoting.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private SecurityLogRepository securityLogRepository;

    @Autowired
    private VoteLogRepository voteLogRepository;

    @Autowired
    private VoteRepository voteRepository;

    // ✅ Admin Login - Updated to accept JSON body
    @PostMapping("/login")
public ResponseEntity<Map<String, String>> loginAdmin(@RequestBody Map<String, String> payload) {
    String email = payload.get("email");
    String password = payload.get("password");

    Map<String, String> response = new HashMap<>();
    Optional<Admin> admin = adminRepository.findByEmail(email);

    if (admin.isPresent() && admin.get().getPassword().equals(password)) {
        response.put("message", "Login Successful");
        response.put("redirect", "/admin-dashboard");
        return ResponseEntity.ok(response);
    } else {
        response.put("message", "Invalid email or password");
        return ResponseEntity.status(401).body(response);
    }
}


    // ✅ Get Pending Voters
    @GetMapping("/pending-voters")
    public ResponseEntity<List<Voter>> getPendingVoters() {
        return ResponseEntity.ok(adminService.getPendingVoters());
    }

    // ✅ Approve Voter
    @PostMapping("/approve-voter")
    public ResponseEntity<String> approveVoter(@RequestParam String email) {
        adminService.approveVoter(email);
        return ResponseEntity.ok("Voter approved successfully.");
    }

    // ✅ Get Security Logs
    @GetMapping("/security-logs")
    public ResponseEntity<List<SecurityLog>> getSecurityLogs(@RequestParam(required = false) String userId) {
        List<SecurityLog> logs = (userId != null)
                ? securityLogRepository.findByUserId(userId)
                : securityLogRepository.findAll();
        return ResponseEntity.ok(logs);
    }

    // ✅ Get Vote Logs
    @GetMapping("/vote-logs")
    public ResponseEntity<List<VoteLog>> getVoteLogs() {
        return ResponseEntity.ok(voteLogRepository.findAll());
    }

    // ✅ Alias for Vote Logs
    @GetMapping("/logs")
    public ResponseEntity<List<VoteLog>> getLogs() {
        return ResponseEntity.ok(voteLogRepository.findAll());
    }

    // ✅ Cast Vote (admin-triggered or from frontend test)
    @PostMapping("/cast")
    public ResponseEntity<String> castVote(@RequestBody Vote vote) {
        try {
            voteRepository.save(vote);
            return ResponseEntity.ok("Vote cast successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error casting vote: " + e.getMessage());
        }
    }

    // ✅ Get Vote Results
    @GetMapping("/results")
    public ResponseEntity<Map<String, Long>> getVoteResults() {
        List<Object[]> rawResults = voteRepository.countVotesPerCandidateRaw();
        Map<String, Long> results = new HashMap<>();

        for (Object[] row : rawResults) {
            String candidateId = String.valueOf(row[0]);
            Long voteCount = ((Number) row[1]).longValue();
            results.put(candidateId, voteCount);
        }

        return ResponseEntity.ok(results);
    }

    // ✅ Test Endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Admin Controller is working.");
    }
}
