package com.sau.onlinevoting.service;

import com.sau.onlinevoting.model.Candidate;
import com.sau.onlinevoting.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }
    
    public Candidate addCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

}
