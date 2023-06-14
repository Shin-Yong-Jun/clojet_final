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
    @Column(name = "p_seq")
    private Long productSeq;

    @Column(name = "ct_grp")
    private char ctGrp;

    @Column(name = "cm_grp")
    private char cmGrp;

    @Column(name = "cb_type")
    private char cbType;

    @Column(name = "cc_type")
    private char ccType;

    @Column(name = "cs_type")
    private char csType;

    @Column(name = "gender_code")
    private char genderCode;

    @Column(name = "p_name")
    private String productName;

    @Column(name = "p_price")
    private String productPrice;

    @Column(name = "p_enroll")
    private String productEnroll;

    @Column(name = "p_size")
    private String productSize;

    @Column(name = "p_stock")
    private int productStock;

    @Column(name = "p_thum_url")
    private String productThumUrl;

    @Column(name = "p_detail")
    private String productDetail;
}
