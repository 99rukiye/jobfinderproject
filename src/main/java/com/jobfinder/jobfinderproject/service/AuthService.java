package com.jobfinder.jobfinderproject.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jobfinder.jobfinderproject.dto.LoginRequestDTO;
import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.repository.UserRepository;
import com.jobfinder.jobfinderproject.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public String login(LoginRequestDTO dto) {
        logger.info("Giriş denemesi: {}", dto.getEmail());

        Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
        if (optionalUser.isEmpty()) {
            logger.warn("Giriş başarısız: Kullanıcı bulunamadı - {}", dto.getEmail());
            throw new RuntimeException("Kullanıcı bulunamadı");
        }

        User user = optionalUser.get();

        if (user.isBlocked()) {
            logger.warn("Bloke kullanıcı giriş denedi: {}", user.getEmail());
            throw new RuntimeException("Kullanıcı hesabı bloke edilmiş.");
        }

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );
            logger.info("Giriş başarılı: {}", user.getEmail());

            user.setFailedLoginAttempts(0);
            userRepository.save(user);

            return jwtUtil.generateToken((UserDetails) auth.getPrincipal());

        } catch (BadCredentialsException e) {
            int currentAttempts = user.getFailedLoginAttempts();
            user.setFailedLoginAttempts(currentAttempts + 1);

            if (user.getFailedLoginAttempts() >= 3) {
                user.setBlocked(true);
                logger.warn("Kullanıcı bloke edildi: {}", user.getEmail());
            }

            userRepository.save(user);
            logger.warn("Giriş başarısız: {} - {}. deneme", user.getEmail(), user.getFailedLoginAttempts());
            throw new RuntimeException("Geçersiz bilgiler. Kalan hakkınız: " + (3 - user.getFailedLoginAttempts()));
        }
    }

}
