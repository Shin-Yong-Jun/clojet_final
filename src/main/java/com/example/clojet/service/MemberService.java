package com.example.clojet.service;

import com.example.clojet.domain.Member;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {
    Member createMember(Member member);
    ResponseEntity<?> loginMember(Member memberLogin);
    String generateRandomPassword();
    ResponseEntity<?> findMember(Member memberFindPw);
    List<Member> getAllMembers();
    Member getMemberById(Long uid);
    ResponseEntity<Object> updateMember(Long id, Member memberNewData);

    void deleteMember(Long id);
}
