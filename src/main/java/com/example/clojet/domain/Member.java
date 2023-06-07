package com.example.clojet.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MEMBER")
@Data
public class Member {

    @Id
    @Column(name="USER_EMAIL")
    private String USER_EMAIL;

    @Column(name="USER_PW")
    private String USER_PW;

    @Column(name="USER_GENDER")
    private Character USER_GENDER;

    @Column(name="USER_PHONE")
    private String USER_PHONE;
}
