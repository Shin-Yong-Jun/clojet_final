package com.example.clojet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "gender")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gender {

    @Id
    @Column(name="gender_code", nullable = false)
    private char genderCode;

    @Column(name="gender_mean", nullable = false)
    private String genderMean;


}
