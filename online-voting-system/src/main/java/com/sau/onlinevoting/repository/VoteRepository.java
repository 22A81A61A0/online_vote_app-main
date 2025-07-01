package com.sau.onlinevoting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sau.onlinevoting.model.Vote;
import com.sau.onlinevoting.model.Voter;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByVoterId(String voterId);
    @Query("SELECT v.candidateId, COUNT(v) FROM Vote v GROUP BY v.candidateId")
    List<Object[]> countVotesPerCandidateRaw(); // if needed
}
