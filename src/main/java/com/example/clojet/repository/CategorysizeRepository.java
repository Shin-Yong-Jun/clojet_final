package com.example.clojet.repository;

import com.example.clojet.domain.Categorycolor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorycolorRepository extends JpaRepository<Categorycolor, String> {


}
