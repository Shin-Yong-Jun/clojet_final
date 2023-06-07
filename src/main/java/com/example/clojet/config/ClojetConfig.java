package com.example.clojet.config;

import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClojetConfig {
    private final MemberRepository memberRepository;

    @Autowired
    public ClojetConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }
}
