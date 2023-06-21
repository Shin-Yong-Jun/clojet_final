package com.example.clojet.service;

import com.example.clojet.domain.Product;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();

}
