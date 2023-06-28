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

    private List<String> ctGrp; //대분류 영문제목(BEST, NEW, SALE...)
    private List<String> ctValMean; //대분류 설명(BEST, NEW, SALE...)
    private List<String> cmGrp; //중분류 영문제목(원피스,아우터...)
    private List<String> cmValMean; //중분류 이름(원피스,아우터...)
    private List<String> ccType; //색상 타입
    private List<String> ccValMean; //색상 이름
    private List<String> csType; //사이즈 타입
    private List<String> genderCode; //성별코드 (f,m,u)
    private List<String> genderMean; //성별코드 설명(female, male, unisex)




}
