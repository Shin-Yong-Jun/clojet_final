package com.example.clojet.service;

import com.example.clojet.domain.Product;
import com.example.clojet.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product createProduct(Product creatingProduct) {
        Optional<Product> existingProduct = productRepository.findFirstByProductName(creatingProduct.getProductName());
        if (existingProduct.isPresent()) {
            throw new IllegalStateException("기존 상품명이 등록되어 있습니다.");
        }
        return productRepository.save(creatingProduct);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    @Override
    public List<Product> findProductBySearch(String productName, Character cbType) {
        if (productName != null && cbType != null) {
            return productRepository.findByProductNameAndCbTypeContaining(productName, cbType);
        } else if (productName != null) {
            return productRepository.findByProductNameContaining(productName);
        } else if (cbType !=null) {
            return productRepository.findByCbTypeContaining(cbType);
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Product> findProductByCtGrp(Character ctGrp) {
        return null;
    }


}
