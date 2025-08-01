package com.jobfinder.jobfinderproject.service;

import com.jobfinder.jobfinderproject.dto.UserRegisterRequestDTO;
import com.jobfinder.jobfinderproject.dto.UserProfileUpdateDTO;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.entity.Role;
import com.jobfinder.jobfinderproject.repository.UserRepository;
import com.jobfinder.jobfinderproject.repository.RoleRepository;
import com.jobfinder.jobfinderproject.util.FileWriterUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    // ✅ Kullanıcı Kaydı
    public User registerUser(UserRegisterRequestDTO requestDTO) {
        User user = new User();
        user.setFullName(requestDTO.getFullName());
        user.setPhone(requestDTO.getPhone());
        user.setExperience(requestDTO.getExperience());
        user.setMilitaryStatus(requestDTO.getMilitaryStatus());
        user.setCvText(requestDTO.getCvText());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));

        // Rol bilgisine göre ayarlama
        String roleName = requestDTO.getRole() != null ? requestDTO.getRole().toUpperCase() : "USER";

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Rol bulunamadı: " + roleName));

        user.setRoles(Set.of(role));

        return userRepository.save(user); // 🔁 Eksik return eklendi
    }

    public User updateUserProfile(String email, UserProfileUpdateDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        user.setFullName(dto.getFullName());
        user.setPhone(dto.getPhone());
        user.setExperience(dto.getExperience());
        user.setMilitaryStatus(dto.getMilitaryStatus());
        user.setCvText(dto.getCvText());

        return userRepository.save(user);
    }
}
