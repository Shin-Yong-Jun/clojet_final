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
@Table(name="categorymid")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorybot {

    @Id
    @Column(name="cbType", nullable = false)
    private char cbType;

    @Column(name="cmGrp")
    private char cmGrp;

    @Column(name="cbValMean")
    private String cbValMean;


}
