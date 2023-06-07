package com.example.clojet.config;

import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClojetConfig {

    @Autowired
    public ClojetConfig(MemberRepository memberRepository) {
    }

}
