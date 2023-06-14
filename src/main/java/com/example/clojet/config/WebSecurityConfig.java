package com.example.clojet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return
// Security 구성전 세팅(기본 로그인 화면 비활성화)
                http
                        .cors().disable() // CORS(Cross-Origin Resource Sharing) 비활성화
                        .csrf().disable() // CSRF(Cross-Site Request Forgery) 비활성화
                        .formLogin().disable() // 기본 로그인 폼 비활성화
                        .logout().logoutSuccessUrl("/") // 로그아웃 설정 및 로그아웃 성공 시 이동할 URL 설정
                        .and()
                        .httpBasic() // HTTP 기본 인증 활성화
                        .and().build();

// Security 구성후 세팅
//                http.csrf().disable()  // CSRF 보호 기능 비활성화
//                .authorizeHttpRequests()  // HTTP 요청에 대한 권한 부여 설정 시작
//                    .requestMatchers("/").authenticated()  // 루트 경로 ("/")에 대해 인증된 사용자만 접근 허용
//                    .requestMatchers("/admin/**").hasRole("ADMIN") // "/admin/**" 패턴에 대해 "ADMIN" 역할을 가진 사용자만 접근 허용
//                    .anyRequest().permitAll()  // 그 외의 요청에 대해서는 인증 없이 접근 허용
//                .and()
//                .formLogin()  // 폼 기반 로그인 설정 시작
//                    .loginPage("/login")  // 커스텀 로그인 페이지 URL 설정
//                    .loginProcessingUrl("/authenticate")  // 로그인 폼이 제출되는 URL 설정
//                    .defaultSuccessUrl("/")  // 인증 성공 후 기본적으로 리디렉션될 URL 설정
//                .and()
//                .build();  // SecurityFilterChain 객체를 빌드하고 반환
    }
}