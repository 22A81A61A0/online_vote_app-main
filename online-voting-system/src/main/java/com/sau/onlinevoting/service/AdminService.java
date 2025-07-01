package com.sau.onlinevoting.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sau.onlinevoting.model.Admin;
import com.sau.onlinevoting.model.Voter;
import com.sau.onlinevoting.repository.AdminRepository;
import com.sau.onlinevoting.repository.VoterRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private VoterRepository voterRepository;

    public boolean authenticateAdmin(String email, String password) {
        Optional<Admin> admin = adminRepository.findByEmail(email);
        return admin.isPresent() && admin.get().getPassword().equals(password);
    }
    
    public List<Voter> getPendingVoters() {
        return voterRepository.findByApprovedFalse();
    }

    public void approveVoter(String email) {
        Voter voter = voterRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Voter not found"));
        voter.setApproved(true);
        voterRepository.save(voter);
    }
}
