package com.example.clojet.repository;

import com.example.clojet.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    //검색용
    Optional<Product> findByProductNameContaining(String productName);

    //헤더 카테고리용
    Optional<Product> findByCtGrp(char ctGrp);

    // 카테고리 페이지 내의 사이드메뉴 용

}
