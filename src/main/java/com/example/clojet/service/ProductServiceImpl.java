package com.example.clojet.service;

import com.example.clojet.domain.Product;
import com.example.clojet.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        Optional<Product> productOptional = productRepository.findByProductName(product.getProductName());
        if(productOptional.isPresent()) {
            throw new IllegalArgumentException("기존 등록된 상품명과 같습니다. 다시 확인해주세요.");
        } else {
        return productRepository.save(product);
        }
    }

    @Override
    public List<Product> getAllProducts() {return productRepository.findAll();}
}
