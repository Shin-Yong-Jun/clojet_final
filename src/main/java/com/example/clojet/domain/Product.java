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
    private Long pSeq;

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
    private String pName;

    @Column(name = "p_price")
    private String pPrice;

    @Column(name = "p_enroll")
    private String pEnroll;

    @Column(name = "p_size")
    private String pSize;

    @Column(name = "p_stock")
    private int pStock;

    @Column(name = "p_thum_url")
    private String pThumUrl;

    @Column(name = "p_detail")
    private String pDetail;
}
