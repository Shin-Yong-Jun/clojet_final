package com.example.clojet.config;

import com.example.clojet.repository.MemberRepository;
import com.example.clojet.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClojetConfig {

    private MemberRepository memberRepository;


    @Autowired
    public ClojetConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

}
