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
    @Column(name="cc_type", nullable = false)
    private String cc_type;

    @Column(name="cc_valmean")
    private String cc_valmean;


}
