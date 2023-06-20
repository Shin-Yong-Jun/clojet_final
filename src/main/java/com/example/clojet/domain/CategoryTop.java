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
public class CategoryTop {
    @Id
    @Column(name="ct_grp", nullable = false )
    private char ctGrp;

    @Column(name="ct_valmean", nullable = false)
    private String ctValMean;


}
