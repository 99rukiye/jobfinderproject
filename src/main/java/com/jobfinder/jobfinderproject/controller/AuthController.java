package com.jobfinder.jobfinderproject.controller;

import com.jobfinder.jobfinderproject.dto.LoginRequestDTO;
import com.jobfinder.jobfinderproject.dto.AdminRegisterRequestDTO;
import com.jobfinder.jobfinderproject.dto.UserRegisterRequestDTO;
import com.jobfinder.jobfinderproject.entity.Admin;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.service.AuthService;
import com.jobfinder.jobfinderproject.service.AdminService;
import com.jobfinder.jobfinderproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;
    private final AuthService authService;

    // USER REGISTER
    @PostMapping("/register/user")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterRequestDTO dto) {
        User registeredUser = userService.registerUser(dto);
        return ResponseEntity.ok(registeredUser);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {
        String token = authService.login(dto);
        return ResponseEntity.ok(token);
    }

    // ADMIN REGISTER
    @PostMapping("/register/admin")
    public ResponseEntity<Admin> registerAdmin(@RequestBody AdminRegisterRequestDTO dto) {
        Admin registeredAdmin = adminService.registerAdmin(dto);
        return ResponseEntity.ok(registeredAdmin);
    }
}
