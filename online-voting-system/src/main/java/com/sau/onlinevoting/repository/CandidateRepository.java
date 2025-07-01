package com.sau.onlinevoting.repository;

import com.sau.onlinevoting.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, String> {
}
