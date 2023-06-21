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
@Table(name="categorytop")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorytop {
    @Id
    @Column(name="ctGrp", nullable = false )
    private char ctGrp;

    @Column(name="ctValMean", nullable = false)
    private String ctValMean;


}
