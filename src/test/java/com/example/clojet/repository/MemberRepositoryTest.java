package com.example.clojet.repository;

import com.example.clojet.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void testClass() {
        System.out.println(memberRepository.getClass().getName());
    }


    @Test
    public void testInsertDummies() {
        IntStream.rangeClosed(1,100).forEach(i-> {
            Member member = Member.builder()
                    .USER_EMAIL("test@gmail.com")
                    .USER_PW("1234")
                    .USER_GENDER('m')
                    .USER_PHONE("01039152118")
                    .build();
            memberRepository.save(member);
        });
    }


    @Test
    public void testSelect() {
        String USER_EMAIL = "test@gmail.com";
        Optional<Member> result = memberRepository.findById(USER_EMAIL);

        System.out.println("===================================");

        if (result.isPresent()) {
            Member member = result.get();
            System.out.println(member);
        }
    }


    @Transactional
    @Test
    public void testSelect2() {
        String USER_EMAIL = "test@gmail.com";

        Member member = memberRepository.getOne(USER_EMAIL);
        System.out.println("===================================");
        System.out.println(member);

    }

    @Test
    public void testUpdate() {
        Member member = Member.builder()
                .USER_EMAIL("test@gmail.com")
                .USER_PW("12345!")
                .USER_GENDER('f')
                .USER_PHONE("01036152119")
                .build();

        System.out.println(memberRepository.save(member));
    }

    @Test
    public void testDeleteAll() {
        memberRepository.deleteAll();

    }

    @Test
    public void testPageDefault() {
        //1페이지 10개
        Pageable pageable = PageRequest.of(0, 10);
        Page<Member> result = memberRepository.findAll(pageable);
        System.out.println(result);
        System.out.println("----------------------------------------------");

        System.out.println("Total Pages : " + result.getTotalPages()); //총 몇

        System.out.println("Total Count : " + result.getTotalElements()); // 전체

        System.out.println("Page Number : " + result.getNumber()); // 현재페이지번호

        System.out.println("Page Size : " + result.getSize()); // 페이지당 데이터개수

        System.out.println("has next Page? : " + result.hasNext()); // 다음 페이지

        System.out.println("first page? : " + result.isFirst()); // 시작페이지 여부

    }



}
