package com.example.clojet.controller;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class MemberController {

    private MemberService memberService;


    @GetMapping("/members")
    public  List<Member> list() {
        return memberService.findMembers();
    }
}
