package com.example.clojet.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="categorybot")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorybot {

    @Id
    @Column(name="cb_grp", nullable = false, length = 1)
    private String cb_grp;

    @Column(name="cb_valmean")
    private String cb_valmean;


}
