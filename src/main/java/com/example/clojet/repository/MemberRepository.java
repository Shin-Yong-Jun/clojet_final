package com.example.clojet.repository;

import com.example.clojet.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {


    Optional<Member> findByUserEmail(String userEmail);

    Optional<Member> findByUserEmailAndUserPhone(String userEmail, String userPhone);

    Optional<Member> findByUserEmailAndUserPw(String userEmail, String userPw);


}
