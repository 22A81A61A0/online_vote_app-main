package com.sau.onlinevoting.model;

import jakarta.persistence.*;

@Entity
@Table(name = "voters")
public class Voter {
    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String voterId;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private int otp;

    private boolean mfaEnabled;

    @Column(nullable = false)
    private boolean approved = false; // New field to track approval status

    public Voter() {}

    public Voter(String voterId, String name, String email, String password, int otp, boolean mfaEnabled, boolean approved) {
        this.voterId = voterId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.otp = otp;
        this.mfaEnabled = mfaEnabled;
        this.approved = approved;
    }

    public String getVoterId() { return voterId; }
    public void setVoterId(String voterId) { this.voterId = voterId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getOtp() { return otp; }
    public void setOtp(int otp) { this.otp = otp; }

    public boolean isMfaEnabled() { return mfaEnabled; }
    public void setMfaEnabled(boolean mfaEnabled) { this.mfaEnabled = mfaEnabled; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
}
