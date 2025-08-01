package com.jobfinder.jobfinderproject.service;

import com.jobfinder.jobfinderproject.dto.UserRegisterRequestDTO;
import com.jobfinder.jobfinderproject.dto.UserProfileUpdateDTO;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.repository.UserRepository;
import com.jobfinder.jobfinderproject.util.FileWriterUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Kullanıcı Kaydı
    public User registerUser(UserRegisterRequestDTO dto) {
        logger.info("Yeni kullanıcı kayıt ediliyor: {}", dto.getEmail());

        User user = User.builder()
                .fullName(dto.getFullName())
                .phone(dto.getPhone())
                .experience(dto.getExperience())
                .militaryStatus(dto.getMilitaryStatus())
                .cvText(dto.getCvText())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .blocked(false)
                .failedLoginAttempts(0)
                .build();

        User savedUser = userRepository.save(user);
        logger.info("Kayıt başarılı: ID={} Email={}", savedUser.getId(), savedUser.getEmail());

        FileWriterUtil.writeUserToCsv(savedUser); // CSV'ye yaz
        return savedUser;
    }

    // ✅ Kullanıcı Profil Güncelleme
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
