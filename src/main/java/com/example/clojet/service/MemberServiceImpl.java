package com.example.clojet.service;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;


    @Override
    public Member createMember(Member member) {
        Optional<Member> memberOptional = memberRepository.findByUserEmail(member.getUserEmail());
        if (memberOptional.isPresent()) {
            throw new IllegalArgumentException("기존 계정이 등록되어 있습니다.");
        }
        String encryptedPassword = passwordEncoder.encode(member.getUserPw());
        member.setUserPw(encryptedPassword);
        return memberRepository.save(member);
    }

    @Override
    public ResponseEntity<?> loginMember(Member memberLogin) {
        Optional<Member> memberOptional = memberRepository.findByUserEmail(memberLogin.getUserEmail());
        if (memberOptional.isPresent()) {
            Member storedMember = memberOptional.get();
            boolean passwordMatches = passwordEncoder.matches(memberLogin.getUserPw(), storedMember.getUserPw());
            if (passwordMatches) {
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.badRequest().body("로그인 정보가 일치하지 않습니다.");
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
            String encryptedPassword = passwordEncoder.encode(newRandomPw);
            member.setUserPw(encryptedPassword);
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
    public ResponseEntity<Object> updateMember(Long id, Member memberNewData) {
        Optional<Member> memberOptional = memberRepository.findById(id);
        if (memberOptional.isPresent()) {
            Member storedMember = memberOptional.get();
            if (memberNewData.getUserPw() != null && !memberNewData.getUserPw().isEmpty()) {
                // 새로운 비밀번호가 입력된 경우
                String encryptedPassword = passwordEncoder.encode(memberNewData.getUserPw());
                storedMember.setUserPw(encryptedPassword);
            }
            storedMember.setUserName(memberNewData.getUserName());
            storedMember.setUserGender(memberNewData.getUserGender());
            storedMember.setUserPhone(memberNewData.getUserPhone());
            memberRepository.save(storedMember);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("백엔드에서 이상합니다.");
    }



    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
