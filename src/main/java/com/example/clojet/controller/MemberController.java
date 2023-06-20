package com.example.clojet.controller;

import com.example.clojet.domain.Member;
import com.example.clojet.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final HttpSession session;

    @PostMapping("/create")
    public ResponseEntity<?> createMember(@RequestBody Member member) {
        try {
            Member createdMember = memberService.createMember(member);
            return ResponseEntity.ok(createdMember);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody Member memberLogin) {
        try {
            ResponseEntity<?> response = memberService.loginMember(memberLogin);
            return response;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/findPw")
    public ResponseEntity<?> findMember(@RequestBody Member memberFindPw) {
        try {
            ResponseEntity<?> response = memberService.findMember(memberFindPw);
            return response;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public List<Member> readAll() {
        return memberService.getAllMembers();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> readMember(@PathVariable Long id) {
        try {
            Member member = memberService.getMemberById(id);
            return ResponseEntity.ok(member);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id, @RequestBody Member memberNewData) {
        try {
            memberService.updateMember(id, memberNewData);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        try {
            memberService.deleteMember(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


