package com.example.clojet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="categorycolor")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorycolor {

    @Id
    @Column(name="ccType", nullable = false)
    private String ccType;

    @Column(name="ccValMean")
    private String ccValMean;

}
