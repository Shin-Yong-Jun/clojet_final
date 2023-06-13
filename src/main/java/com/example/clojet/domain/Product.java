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
    private Long p_seq;

    @Column(name = "ct_grp")
    private char ctGrp;

    @Column(name = "cm_grp")
    private char cm_grp;

    @Column(name = "cb_type")
    private char cb_type;

    @Column(name = "cc_type")
    private char cc_type;

    @Column(name = "cs_type")
    private char cs_type;

    @Column(name = "gender_code")
    private char gender_code;

    @Column(name = "p_name")
    private String p_name;

    @Column(name = "p_price")
    private String p_price;

    @Column(name = "p_enroll")
    private String p_enroll;

    @Column(name = "p_size")
    private String p_size;

    @Column(name = "p_stock")
    private int p_stock;

    @Column(name = "p_thum_url")
    private String p_thum_url;

    @Column(name = "p_detail")
    private String p_detail;
}
