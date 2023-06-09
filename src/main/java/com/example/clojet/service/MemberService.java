package com.example.clojet.service;

import com.example.clojet.domain.Member;
import com.example.clojet.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
//
//    public MemberService(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }
//-------------------------------------------------
//    public List<Member> findMembers() {
//        List<Member> Members = memberRepository.findAll();
//
//        if(!findMembers().isEmpty()) return memberRepository.findAll();
//        else throw new IllegalStateException("no such data");
//    }
//
//    public Member findByUserEmail(final String userEmail) {
//        return memberRepository.findByUserEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("no such data"));
//    }
//    public Member createMember(final Member createMember) {
//        if(createMember == null) throw new IllegalStateException("member item cannot be null");
//        return memberRepository.save(createMember);
//    }
//
//    public Member updateMember(final String userEmail, final Member updateMember) {
//        Member member = findByUserEmail(userEmail);
//        member.setUserPw(updateMember.getUserPw());
//        member.setUserPhone(updateMember.getUserPhone());
//
//        return memberRepository.save(member);
//    }
//
//    public void deleteMemberByUserEmail(final String userEmail) {
//        memberRepository.deleteById(userEmail);
//    }



    //-------------------------------------------------

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public String join(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
        return "가입완료";
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByUserEmail(member.getUserEmail())
                .ifPresent(m->{
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }





}
