package com.example.clojet.service;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MemberService {
    private MemberRepository memberRepository;

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }


}
