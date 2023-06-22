package com.example.clojet.repository;

import com.example.clojet.domain.Categorytop;
import com.example.clojet.domain.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderRepository extends JpaRepository<Gender, String> {


}
