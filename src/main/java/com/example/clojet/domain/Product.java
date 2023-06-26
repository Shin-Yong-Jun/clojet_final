package com.example.clojet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productSeq")
    private Long productSeq;

    @Column(name = "ctGrp", nullable = true)
    private String ctGrp;

    @Column(name = "cmGrp", nullable = true)
    private String cmGrp;

    @Column(name = "ccType", nullable = true)
    private String ccType;

    @Column(name = "csType", nullable = true)
    private String csType;

    @Column(name = "genderCode", nullable = true)
    private String genderCode;

    @Column(name = "productName", nullable = true)
    private String productName;

    @Column(name = "productPrice", nullable = true)
    private String productPrice;

    @Column(name = "productEnroll", nullable = true)
    private String productEnroll;

    @Column(name = "productStock", nullable = true)
    private int productStock;

    @Column(name = "productThumUrl", nullable = true)
    private String productThumUrl;

    @Column(name = "productDetail", nullable = true)
    private String productDetail;
}
