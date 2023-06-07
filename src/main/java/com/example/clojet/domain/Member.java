package com.example.clojet.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MEMBER")
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    public String getUSER_EMAIL() {
        return USER_EMAIL;
    }

    public void setUSER_EMAIL(String USER_EMAIL) {
        this.USER_EMAIL = USER_EMAIL;
    }

    public String getUSER_PW() {
        return USER_PW;
    }

    public void setUSER_PW(String USER_PW) {
        this.USER_PW = USER_PW;
    }

    public Character getUSER_GENDER() {
        return USER_GENDER;
    }

    public void setUSER_GENDER(Character USER_GENDER) {
        this.USER_GENDER = USER_GENDER;
    }

    public String getUSER_PHONE() {
        return USER_PHONE;
    }

    public void setUSER_PHONE(String USER_PHONE) {
        this.USER_PHONE = USER_PHONE;
    }


}
