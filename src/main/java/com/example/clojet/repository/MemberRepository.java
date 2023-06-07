package com.example.clojet.repository;

import com.example.clojet.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

//    Optional<Member> findByUser_email(String user_email);


    @Override
    List<Member> findAll();
}
