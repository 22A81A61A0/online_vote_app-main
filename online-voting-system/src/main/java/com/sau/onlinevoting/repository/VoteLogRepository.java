package com.sau.onlinevoting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sau.onlinevoting.model.VoteLog;

public interface VoteLogRepository extends JpaRepository<VoteLog, Long> {
    List<VoteLog> findByVoterId(String voterId);
}
