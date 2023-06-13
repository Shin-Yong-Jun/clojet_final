package com.example.clojet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorydto {

    private String cc_type; //색상 타입
    private String cc_valmean; //색상 이름
    private String cm_valmean; //중분류 이름(원피스,아우터...)
    private String cs_type; //사이즈 타입


}
