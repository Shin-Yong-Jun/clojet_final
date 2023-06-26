package com.example.clojet.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productAll")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductAll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="productAllSeq")
    private Long productAllSeq;

    @Column(name = "productSeq")
    private Long productSeq;

    @Column(name = "ccType")
    private String ccType;

    @Column(name = "csType")
    private String csType;

    @Column(name = "eachStock")
    private int eachStock;

    public ProductAll(Long productSeq, String ccType, String csType, int eachStock) {
        this.productSeq = productSeq;
        this.ccType = ccType;
        this.csType = csType;
        this.eachStock = eachStock;
    }

}