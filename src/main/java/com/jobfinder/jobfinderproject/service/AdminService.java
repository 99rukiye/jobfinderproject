package com.jobfinder.jobfinderproject.service;

import com.jobfinder.jobfinderproject.dto.AdminRegisterRequestDTO;
import com.jobfinder.jobfinderproject.entity.Admin;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.repository.AdminRepository;
import com.jobfinder.jobfinderproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Admin registerAdmin(AdminRegisterRequestDTO dto) {
        Admin admin = Admin.builder()
                .companyName(dto.getCompanyName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        return adminRepository.save(admin);
    }


    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }


    public Page<User> getUsersWithMilitaryDone(Pageable pageable) {
        return userRepository.findByMilitaryStatusIgnoreCase("yapıldı", pageable);
    }


    public Page<User> getUsersWithFiveYearsExperience(Pageable pageable) {
        Page<User> allUsers = userRepository.findAll(pageable);

        List<User> filtered = allUsers
                .stream()
                .filter(u -> u.getExperience() != null && u.getExperience().toLowerCase().contains("5 yıl"))
                .toList();

        return new PageImpl<>(filtered, pageable, filtered.size());
    }


    public Page<User> getBlockedUsers(Pageable pageable) {
        return userRepository.findByBlockedTrue(pageable);
    }
}
