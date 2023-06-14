package com.example.clojet.service;

import com.example.clojet.domain.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();

    List<Product> findProductBySearch(String productName, Character cbType);

    List<Product> findProductByCtGrp(Character ctGrp);

}
