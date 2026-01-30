package com.qualinterns.dealership_app_api.security;

import com.qualinterns.dealership_app_api.util.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private static final String JWT_COOKIE_NAME = "jwtToken";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = extractTokenFromCookie(request);

            if (token != null) {
                if (tokenProvider.validateToken(token)) {
                    String username = tokenProvider.getUsernameFromToken(token);

                    if (username != null) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(username, null, java.util.Collections.emptyList());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        log.debug("Set Spring Security authentication for user: {}", username);
                        try {
                            String newToken = tokenProvider.generateToken(username);
                            int maxAge = tokenProvider.getJwtExpirationSeconds();

                            StringBuilder cookieHeader = new StringBuilder();
                            cookieHeader.append(JWT_COOKIE_NAME).append("=").append(newToken)
                                    .append("; Path=/; HttpOnly; Max-Age=").append(maxAge)
                                    .append("; SameSite=Strict");
                            if (request.isSecure()) {
                                cookieHeader.append("; Secure");
                            }
                            response.addHeader("Set-Cookie", cookieHeader.toString());
                        } catch (Exception e) {
                            log.warn("Failed to refresh JWT cookie: {}", e.getMessage());
                        }
                    }
                } else {
                    log.warn("JWT token validation failed");
                }
            }
        } catch (Exception e) {
            log.error("Could not set user authentication in security context", e);
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (JWT_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
