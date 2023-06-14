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
    @Column(name="cs_type", nullable = false)
    private String cs_type;

    @Column(name="cs_valmean")
    private String cs_valmean;

    private int index;


}
