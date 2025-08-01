package com.jobfinder.jobfinderproject.controller;

import com.jobfinder.jobfinderproject.dto.UserProfileUpdateDTO;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/update")
    public ResponseEntity<User> updateUserProfile(@RequestBody UserProfileUpdateDTO dto,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        User updatedUser = userService.updateUserProfile(userEmail, dto);
        return ResponseEntity.ok(updatedUser);
    }
}
