package com.sau.onlinevoting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.sau.onlinevoting.repository")
public class OnlineVotingSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(OnlineVotingSystemApplication.class, args);
    }
}
