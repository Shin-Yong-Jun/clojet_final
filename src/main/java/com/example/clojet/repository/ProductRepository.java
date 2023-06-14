package com.example.clojet.repository;

import com.example.clojet.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    Optional<Product> findByP_name(String p_name);
    Optional<Product> findByP
}
