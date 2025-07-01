package com.sau.onlinevoting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sau.onlinevoting.model.Vote;
import com.sau.onlinevoting.service.VoteService;

@RestController
@RequestMapping("/api/votes")  // ✅ Changed from /api/admin to /api/votes
public class VoteController {

    @Autowired
    private VoteService voteService;

    // ✅ Get All Votes (Vote Logs)
    @GetMapping("/logs")  // Renamed for clarity
    public ResponseEntity<List<Vote>> getAllVotes() {
        List<Vote> votes = voteService.getAllVotes();
        return ResponseEntity.ok(votes);
    }

    // ✅ Get Vote Results (Candidate ID -> Vote Count)
    @GetMapping("/results")  // ✅ Now matches frontend request
    public ResponseEntity<Map<Long, Long>> getVoteResults() {
        Map<Long, Long> results = voteService.getVoteResults();
        return ResponseEntity.ok(results);
    }
}
