package com.example.clojet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorydto {

    private List<String> cc_type; //색상 타입
    private List<String> cc_valmean; //색상 이름
    private List<String> cm_valmean; //중분류 이름(원피스,아우터...)
    private List<String> cs_type; //사이즈 타입



}
