package com.jobfinder.jobfinderproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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

    // ✅ Roller (ManyToMany ilişkisi)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    // ✅ Admin ile ilişki (eğer her user bir admine bağlıysa)
    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id", nullable = true)
    private Admin admin;
}
