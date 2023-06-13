package com.example.clojet.controller;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.lang3.RandomStringUtils;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final HttpSession session;

    //Create
    @PostMapping("/create")
    public ResponseEntity<?> createMember(@RequestBody Member member) {
        Optional<Member> memberOptional =
                memberRepository.findByUserEmail(member.getUserEmail());
        if (memberOptional.isPresent()) {
            return  ResponseEntity.badRequest().body("기존 계정이 등록되어있습니다.");
        }

        return ResponseEntity.ok(memberRepository.save(member));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody Member memberLogin, HttpSession session) {
        Optional<Member> memberOptional =
                memberRepository.findByUserEmailAndUserPw(
                        memberLogin.getUserEmail(),
                        memberLogin.getUserPw()
                );
        if (memberOptional.isPresent()) {
            // 로그인 성공
            Member loginMember = memberOptional.get();
            session.setAttribute("loggedInMember", loginMember);
            return ResponseEntity.ok().build();
        } else {
            // 로그인 실패
            return ResponseEntity.badRequest().body("로그인 정보가 일치하지 않습니다.1");
        }
    }


    private String generateRandomPassword() {
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

    @PostMapping("/findPw")
    public ResponseEntity<?> findMember(@RequestBody Member memberFindPw) {
        Optional<Member> memberOptional =
                memberRepository.findByUserEmailAndUserPhone(
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

    //ReadAll
    @GetMapping("/list")
    public List<Member> readAll() {
        return memberRepository.findAll();
    }

    //Read
    @GetMapping("/list/{id}")
    public Member readMember(@PathVariable Long id) throws IllegalStateException {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());
    }


    //Update
    @PutMapping("/update/{id}")
    public void updateMember(@PathVariable Long id, String userEmail) {
        memberRepository.findById(id)
                .map(member -> {
                    member.setUserPw(userEmail);
                    return memberRepository.save(member);
                });
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public void deleteMember(@PathVariable Long id) {
        memberRepository.deleteById(id);
    }
}





//@Controller
//public class MemberController {
//
//    private MemberService memberService;
//
//    @Autowired
//    public MemberController(MemberService memberService) {
//        this.memberService = memberService;
//    }
//
//
//    @GetMapping("/members/new")
//    public String createForm() {
//        return "members/createMembersForm";
//    }
//
//    @PostMapping("/members/new")
//    public String create(MemberForm form) {
//        Member member = Member.builder()
//                .userEmail(form.getUserEmail())
//                .userPw(form.getUserPw())
//                .userGender(form.getUserGender())
//                .userPhone(form.getUserPhone())
//                .build();
//        memberService.join(member);
//        return "redirect:/";
//    }
//
//
//    @GetMapping("/members")
//    public String list(Model model) {
//        List<Member> members = memberService.findMembers();
//        model.addAttribute("members", members);
//        return "members/memberlist";
//
//    }
//
//    //------------------
//    //    @Autowired
////    public MemberController(MemberService memberService) {
////        this.memberService = memberService;
////    }
////
////    @RequestMapping(method = RequestMethod.GET)
////    public @ResponseBody MemberListResponse getMembers() {
////        String errors = DEFAULT_ERR_MSG;
////        List<Member> members = null;
////
////        try {
////            members = memberService.findMembers();
////        } catch (final Exception e) {
////            errors = e.getMessage();
////        }
////
////        return MemberAda
////    }
//
//}
