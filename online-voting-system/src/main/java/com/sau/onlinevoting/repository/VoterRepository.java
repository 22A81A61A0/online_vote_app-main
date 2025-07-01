package com.sau.onlinevoting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sau.onlinevoting.model.Voter;

public interface VoterRepository extends JpaRepository<Voter, String> {
    Optional<Voter> findByEmail(String email);
    List<Voter> findByApprovedFalse();
    List<Voter> findByMfaEnabledFalse();
}