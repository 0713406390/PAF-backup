package com.university.smartcampus.service;

import com.university.smartcampus.entity.AppUser;
import com.university.smartcampus.entity.Role;
import com.university.smartcampus.repository.AppUserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;
    private final RoleMappingService roleMappingService;

    public CustomOAuth2UserService(AppUserRepository appUserRepository, RoleMappingService roleMappingService) {
        this.appUserRepository = appUserRepository;
        this.roleMappingService = roleMappingService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(userRequest);

        String email = oauthUser.getAttribute("email");
        String fullName = Optional.ofNullable((String) oauthUser.getAttribute("name")).orElse("Campus User");

        if (email == null || email.isBlank()) {
            throw new OAuth2AuthenticationException("Email is required from OAuth2 provider");
        }

        AppUser appUser = appUserRepository.findByEmail(email)
                .map(existing -> updateExisting(existing, fullName))
                .orElseGet(() -> createNew(email, fullName));

        Set<GrantedAuthority> authorities = new LinkedHashSet<>(oauthUser.getAuthorities());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + appUser.getRole().name()));

        return new DefaultOAuth2User(authorities, oauthUser.getAttributes(), "email");
    }

    private AppUser updateExisting(AppUser existing, String fullName) {
        existing.setFullName(fullName);
        existing.setUpdatedAt(OffsetDateTime.now());
        return appUserRepository.save(existing);
    }

    private AppUser createNew(String email, String fullName) {
        OffsetDateTime now = OffsetDateTime.now();
        Role resolvedRole = roleMappingService.resolveRole(email);

        AppUser user = new AppUser();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setRole(resolvedRole);
        user.setProvider("google");
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        return appUserRepository.save(user);
    }
}
