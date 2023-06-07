package com.example.clojet.repository;

import com.example.clojet.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    @Override
    Member save(Member member);

//    Optional<Member> findByUSER_EMAIL(String USER_EMAIL);
//
//    Optional<Member> findByUSER_PHONE(String USER_PHONE);

    @Override
    List<Member> findAll();

}

