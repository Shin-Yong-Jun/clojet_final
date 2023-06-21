package com.example.clojet.domain;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "ctGrp", nullable = false)
    private String ctGrp;

    @Column(name = "cmGrp", nullable = false)
    private String cmGrp;

    @Column(name = "ccType", nullable = false)
    private String ccType;

    @Column(name = "csType", nullable = false)
    private String csType;

    @Column(name = "genderCode", nullable = false)
    private String genderCode;

    @Column(name = "productName", nullable = false)
    private String productName;

    @Column(name = "productPrice", nullable = false)
    private String productPrice;

    @Column(name = "productEnroll", nullable = false)
    private String productEnroll;

    @Column(name = "productStock", nullable = false)
    private int productStock;

    @Column(name = "productThumUrl", nullable = false)
    private String productThumUrl;

    @Column(name = "productDetail", nullable = false)
    private String productDetail;
}
