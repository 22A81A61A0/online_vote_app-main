package com.sau.onlinevoting.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "candidates")
public class Candidate {
    
    @Id
    private String candidateId;
    private String name;
    private String party;

    public Candidate() {}

    public Candidate(String candidateId, String name, String party) {
        this.candidateId = candidateId;
        this.name = name;
        this.party = party;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }
}
