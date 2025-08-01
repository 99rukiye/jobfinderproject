package com.jobfinder.jobfinderproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String email;

    private String password;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<User> users;
}
