package com.example.clojet.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="member")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="userEmail", nullable = false)
    private String userEmail;

    @Column(name="userPw", nullable = false)
    private String userPw;

    @Column(name="userGender", nullable = false)
    private Character userGender;

    @Column(name="userPhone", nullable = false)
    private String userPhone;

    @Column(name="userName", nullable = false)
    private String userName;

    @Column(name="userAdmin")
    private Boolean userAdmin;

}
