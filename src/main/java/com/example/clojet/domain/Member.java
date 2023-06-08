package com.example.clojet.domain;

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
    @Column(name="userEmail")
    private String userEmail;

    @Column(name="userPw")
    private String userPw;

    @Column(name="userGender")
    private Character userGender;

    @Column(name="userPhone")
    private String userPhone;

    @Column(name="userAdmin")
    private Boolean userAdmin;

}
