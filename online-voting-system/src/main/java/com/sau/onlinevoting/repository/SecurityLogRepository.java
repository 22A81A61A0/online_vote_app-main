package com.sau.onlinevoting.repository;

import com.sau.onlinevoting.model.SecurityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecurityLogRepository extends JpaRepository<SecurityLog, Long> {
    List<SecurityLog> findByUserId(String userId);
}
