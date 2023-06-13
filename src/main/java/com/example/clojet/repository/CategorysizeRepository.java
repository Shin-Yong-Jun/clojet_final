package com.example.clojet.repository;

import com.example.clojet.domain.Categorysize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorysizeRepository extends JpaRepository<Categorysize, String> {


}
