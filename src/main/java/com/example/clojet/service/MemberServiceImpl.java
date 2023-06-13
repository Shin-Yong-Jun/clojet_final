package com.example.clojet.service;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final HttpSession session;

    @Override
    public Member createMember(Member member) {
        Optional<Member> memberOptional = memberRepository.findByUserEmail(member.getUserEmail());
        if (memberOptional.isPresent()) {
            throw new IllegalArgumentException("기존 계정이 등록되어 있습니다.");
        }
        return memberRepository.save(member);
    }

    @Override
    public ResponseEntity<?> loginMember(Member memberLogin, HttpSession session) {
        Optional<Member> memberOptional = memberRepository.findByUserEmailAndUserPw(
                memberLogin.getUserEmail(),
                memberLogin.getUserPw()
        );
        if (memberOptional.isPresent()) {
            Member loginMember = memberOptional.get();
            session.setAttribute("loggedInMember", loginMember);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("로그인 정보가 일치하지 않습니다.");
        }
    }

    @Override
    public String generateRandomPassword() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";
        StringBuilder password = new StringBuilder();

        // 영어 대문자, 영어 소문자, 특수문자 각각 1개씩 추가
        password.append(RandomStringUtils.random(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
        password.append(RandomStringUtils.random(1, "abcdefghijklmnopqrstuvwxyz"));
        password.append(RandomStringUtils.random(1, "@#$%^&*()?!"));
        password.append(RandomStringUtils.random(1, "1234567890"));

        // 나머지 길이의 문자열 추가
        password.append(RandomStringUtils.random(4, characters));

        // 문자열 섞기
        List<Character> chars = password.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(chars, new SecureRandom());
        StringBuilder shuffledPassword = new StringBuilder();
        chars.forEach(shuffledPassword::append);

        return shuffledPassword.toString();
    }


    @Override
    public ResponseEntity<?> findMember(Member memberFindPw) {
        Optional<Member> memberOptional = memberRepository.findByUserEmailAndUserPhone(
                memberFindPw.getUserEmail(),
                memberFindPw.getUserPhone()
        );
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String newRandomPw = generateRandomPassword();
            member.setUserPw(newRandomPw);
            memberRepository.save(member);
            return ResponseEntity.ok(newRandomPw);
        }
        return ResponseEntity.badRequest().body("비밀번호 찾기 에러");
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());
    }

    @Override
    public void updateMember(Long id, String userEmail) {
        memberRepository.findById(id)
                .map(member -> {
                    member.setUserPw(userEmail);
                    return memberRepository.save(member);
                });
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
