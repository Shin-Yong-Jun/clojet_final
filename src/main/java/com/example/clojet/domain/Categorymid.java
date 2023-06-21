package com.example.clojet.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="categorymid")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorymid {

    @Id
    @Column(name="cmGrp", nullable = false, length = 1)
    private String cmGrp;

    @Column(name="cmValMean")
    private String cmValMean;


}
