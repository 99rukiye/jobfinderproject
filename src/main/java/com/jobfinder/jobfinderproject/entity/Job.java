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

    private String position; // Örnek: Java Developer
    private String description; // İş tanımı
    private String experienceRequired; // Örnek: 5 yıl
    private String militaryStatusRequired; // Örnek: Yapıldı
    private String location;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
