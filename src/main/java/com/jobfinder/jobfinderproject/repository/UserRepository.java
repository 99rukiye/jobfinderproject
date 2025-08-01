package com.jobfinder.jobfinderproject.repository;

import com.jobfinder.jobfinderproject.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Page<User> findByMilitaryStatusIgnoreCase(String status, Pageable pageable); // "yapıldı" için

    Page<User> findByBlockedTrue(Pageable pageable);
}
