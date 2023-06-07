package com.example.clojet.service;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MemberService {
    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }


}
