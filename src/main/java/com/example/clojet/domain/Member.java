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

    @Column(name="user_email", nullable = false)
    private String userEmail;

    @Column(name="user_pw", nullable = false)
    private String userPw;

    @Column(name="user_gender", nullable = false)
    private Character userGender;

    @Column(name="user_phone", nullable = false)
    private String userPhone;

    @Column(name="user_name", nullable = false)
    private String userName;

    @Column(name="user_admin")
    private Boolean userAdmin;

}
