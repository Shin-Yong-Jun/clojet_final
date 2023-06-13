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
    @Column(name="cm_grp", nullable = false, length = 1)
    private String cm_grp;

    @Column(name="cm_valmean")
    private String cm_valmean;


}
