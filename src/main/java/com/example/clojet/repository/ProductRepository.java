package com.example.clojet.repository;

import com.example.clojet.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // 상품 등록을 위해 필요한 메서드
    Optional<Product> findFirstByProductName(String ProductName);


    // 검색을 통해 상품들을 리스트업할 출력 메서드
    List<Product> findByProductNameAndCbTypeContaining(String productName, Character cbType);
    List<Product> findByProductNameContaining(String productName);
    List<Product> findByCbTypeContaining(Character cbType);

    // 헤더 메뉴 Category Top을 클릭했을때 리스트업할 출력 메서드
//    List<Product> findByCtGrp(Character ctGrp);


    // 사이드 메뉴의 항목 체크를 통해 리스트업할 출력 메서드


// 사이드메뉴를 통해 상품들을 리스트업할 출력 메서드
//    List<Product> findBySideCategoryMenu
//            (Character cmGrp, Character genderCode,
//             Character cbType, Character ccType, Character csType);
}
