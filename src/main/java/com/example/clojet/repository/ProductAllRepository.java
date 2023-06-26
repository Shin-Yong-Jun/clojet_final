package com.example.clojet.repository;

import com.example.clojet.domain.ProductAll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAllRepository extends JpaRepository<ProductAll,Long> {

}
