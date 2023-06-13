package com.example.clojet.repository;

import com.example.clojet.domain.Categorymid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorybotRepository extends JpaRepository<Categorymid, String> {


}
