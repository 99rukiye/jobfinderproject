package com.jobfinder.jobfinderproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;
    private String description;
    private String experienceRequired;
    private String militaryStatusRequired;
    private String location;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
