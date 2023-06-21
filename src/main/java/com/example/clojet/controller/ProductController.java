package com.example.clojet.controller;

import com.example.clojet.domain.Product;
import com.example.clojet.domain.ProductAll;
import com.example.clojet.repository.ProductAllRepository;
import com.example.clojet.repository.ProductRepository;
import com.example.clojet.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductAllRepository productAllRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try{
            Product createdProduct = productService.createProduct(product);

            String[] makeType = product.getCcType().split(",");
            String[] makeSize = product.getCsType().split(",");


            for(int i = 0; i < makeType.length; i++){
                for(int j = 0; j < makeSize.length; j++){
                    productAllRepository.save(new ProductAll(
                            product.getProductSeq(),
                            makeType[i],
                            makeSize[j])
                    );
                }
            }
            return ResponseEntity.ok(createdProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public List<Product> readAll() {return productService.getAllProducts();}



}
