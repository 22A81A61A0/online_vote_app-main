package com.sau.onlinevoting.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sau.onlinevoting.model.Vote;
import com.sau.onlinevoting.model.VoteLog;
import com.sau.onlinevoting.repository.VoteLogRepository;
import com.sau.onlinevoting.repository.VoteRepository;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private VoteLogRepository voteLogRepository;

    @Autowired
    private EmailService emailService;

    // ✅ Cast a vote
    public String castVote(String voterId, String candidateId) {
        if (voteRepository.existsByVoterId(voterId)) {
            return "You have already voted.";
        }

        Vote vote = new Vote(voterId, candidateId);
        voteRepository.save(vote);

        VoteLog voteLog = new VoteLog(voterId, candidateId, "Vote Casted");
        voteLogRepository.save(voteLog);

        try {
            emailService.sendVoteConfirmation(voterId);
        } catch (Exception e) {
            System.out.println("⚠ Failed to send confirmation email: " + e.getMessage());
        }

        return "Vote cast successfully.";
    }

    // ✅ Fetch all vote entries
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    // ✅ Calculate and return vote results
    public Map<Long, Long> getVoteResults() {
        List<Object[]> rawResults = voteRepository.countVotesPerCandidateRaw();
        Map<Long, Long> results = new HashMap<>();
        for (Object[] row : rawResults) {
            Long candidateId = ((Number) row[0]).longValue();
            Long voteCount = ((Number) row[1]).longValue();
            results.put(candidateId, voteCount);
        }
        return results;
    }
}