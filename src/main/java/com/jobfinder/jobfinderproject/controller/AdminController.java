package com.jobfinder.jobfinderproject.controller;

import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(adminService.getAllUsers(pageable));
    }

    @GetMapping("/users/military")
    public ResponseEntity<Page<User>> getUsersWithMilitaryDone(Pageable pageable) {
        return ResponseEntity.ok(adminService.getUsersWithMilitaryDone(pageable));
    }

    @GetMapping("/users/experience")
    public ResponseEntity<Page<User>> getUsersWithFiveYearsExperience(Pageable pageable) {
        return ResponseEntity.ok(adminService.getUsersWithFiveYearsExperience(pageable));
    }

    @GetMapping("/users/blocked")
    public ResponseEntity<Page<User>> getBlockedUsers(Pageable pageable) {
        return ResponseEntity.ok(adminService.getBlockedUsers(pageable));
    }
}
