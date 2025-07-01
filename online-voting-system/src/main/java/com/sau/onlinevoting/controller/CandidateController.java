package com.sau.onlinevoting.controller;

import com.sau.onlinevoting.model.Candidate;
import com.sau.onlinevoting.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping
    public List<Candidate> getCandidates() {
        return candidateService.getAllCandidates();
    }

    @PostMapping("/add")
    public ResponseEntity<Candidate> addCandidate(@RequestBody Candidate candidate) {
        Candidate saved = candidateService.addCandidate(candidate);
        return ResponseEntity.ok(saved);
    }
}
