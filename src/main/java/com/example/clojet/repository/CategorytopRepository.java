package com.example.clojet.repository;

import com.example.clojet.domain.Categorymid;
import com.example.clojet.domain.Categorytop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorytopRepository extends JpaRepository<Categorytop, String> {


}
