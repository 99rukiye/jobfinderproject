package com.jobfinder.jobfinderproject.security;

import com.jobfinder.jobfinderproject.entity.User;
import com.jobfinder.jobfinderproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // Sisteme girişte e-mail'e göre kullanıcıyı bulur
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı: " + email));

        return new CustomUserDetails(user);
    }
}
