package com.example.clojet.controller;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;

    //Create
    @PostMapping("/create")
    public ResponseEntity<?> createMember(@RequestBody Member member) {
        return ResponseEntity.ok(memberRepository.save(member));
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
    @PutMapping("/{id}")
    public void updateMember(@PathVariable Long id, String userEmail) {
        memberRepository.findById(id)
                .map(member -> {
                    member.setUserPw(userEmail);
                    return memberRepository.save(member);
                });
    }

    //Delete
    @DeleteMapping("/{id}")
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
