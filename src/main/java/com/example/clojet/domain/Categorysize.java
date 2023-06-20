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
@Table(name="categorysize")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorysize {

    @Id
    @Column(name="csType")
    private String csType;

    @Column(name="csValMean", nullable = false)
    private String csValMean;

    @Column(nullable = false)
    private int index;


}
