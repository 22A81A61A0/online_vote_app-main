package com.sau.onlinevoting.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sau.onlinevoting.model.SecurityLog;
import com.sau.onlinevoting.model.Voter;
import com.sau.onlinevoting.repository.SecurityLogRepository;
import com.sau.onlinevoting.repository.VoterRepository;

@Service
public class VoterService {

    @Autowired
    private VoterRepository voterRepository;
    

    @Autowired
    private EmailService emailService;

    @Autowired
    private SecurityLogRepository securityLogRepository;

    private Random random = new Random();

    public Voter registerVoter(Voter voter) {
        if (voterRepository.findByEmail(voter.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered.");
        }

        int otp = 100000 + random.nextInt(900000);
        voter.setOtp(otp);
        voter.setMfaEnabled(true);
        Voter savedVoter = voterRepository.save(voter);

        try {
            emailService.sendOtpEmail(voter.getEmail(), otp);
        } catch (Exception e) {
            System.out.println("⚠️ Failed to send OTP email: " + e.getMessage());
            // You can also log this to a database or error log if needed
        }

        return savedVoter;
    }

    public boolean verifyOtp(String email, int enteredOtp) {
        Optional<Voter> voter = voterRepository.findByEmail(email);
        return voter.isPresent() && voter.get().getOtp() == enteredOtp;
    }

    public Map<String, String> loginVoter(String email, String password) {
        Map<String, String> response = new HashMap<>();
        Optional<Voter> voterOpt = voterRepository.findByEmail(email);

        if (voterOpt.isPresent()) {
            Voter voter = voterOpt.get();
            if (!voter.getPassword().equals(password)) {
                securityLogRepository.save(new SecurityLog(email, "Failed login attempt"));
                response.put("message", "Invalid email or password");
                return response;
            }

            int newOtp = 100000 + random.nextInt(900000);
            voter.setOtp(newOtp);
            voterRepository.save(voter);

            try {
                emailService.sendOtpEmail(voter.getEmail(), newOtp);
            } catch (Exception e) {
                System.out.println("⚠️ Failed to send login OTP email: " + e.getMessage());
            }

            response.put("message", "Login Successful. OTP sent.");
            response.put("redirect", "/verify-otp");
            return response;
        } else {
            securityLogRepository.save(new SecurityLog(email, "Failed login attempt"));
            response.put("message", "User not found");
            return response;
        }
    }

    public List<Voter> getUnapprovedVoters() {
        return voterRepository.findByApprovedFalse();
    }

    public boolean approveVoter(String voterId) {
        Optional<Voter> voter = voterRepository.findById(voterId);
        if (voter.isPresent()) {
            Voter v = voter.get();
            v.setApproved(true);
            voterRepository.save(v);
            return true;
        }
        return false;
    }
}
