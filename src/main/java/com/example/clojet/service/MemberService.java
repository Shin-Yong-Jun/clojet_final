package com.example.clojet.service;

import com.example.clojet.domain.Member;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {
    Member createMember(Member member);
    ResponseEntity<?> loginMember(Member memberLogin, HttpSession session);
    String generateRandomPassword();
    ResponseEntity<?> findMember(Member memberFindPw);
    List<Member> getAllMembers();
    Member getMemberById(Long id);
    ResponseEntity<Object> updateMember(Long id, Member memberNewData);

    void deleteMember(Long id);
}
