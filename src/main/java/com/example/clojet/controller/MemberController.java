package com.example.clojet.controller;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class MemberController {

    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/new")
    public String createForm() {
        return "members/createMembersForm";
    }

    @PostMapping("/members/new")
    public String create(MemberForm form) {
        Member member = Member.builder()
                .userEmail(form.getUserEmail())
                .userPw(form.getUserPw())
                .userGender(form.getUserGender())
                .userPhone(form.getUserPhone())
                .build();
        memberService.join(member);
        return "redirect:/";
    }


    @GetMapping("/members")
    public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberlist";

    }

}
