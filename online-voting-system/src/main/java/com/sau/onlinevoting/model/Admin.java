package com.sau.onlinevoting.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String adminId;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Constructor
    public Admin() {}

    public Admin(String adminId, String email, String password) {
        this.adminId = adminId;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getAdminId() { return adminId; }
    public void setAdminId(String adminId) { this.adminId = adminId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
