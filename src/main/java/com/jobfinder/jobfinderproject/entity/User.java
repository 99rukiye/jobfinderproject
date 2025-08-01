package com.jobfinder.jobfinderproject.entity;

import jakarta.persistence.*;
import lombok.*;
@Table(name = "[user]")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String phone;

    private String experience;

    private String militaryStatus;

    private String cvText;

    private String email;

    private String password;

    private boolean blocked = false;

    private int failedLoginAttempts = 0;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
