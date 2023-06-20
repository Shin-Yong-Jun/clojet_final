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

    private List<String> ccType; //색상 타입
    private List<String> ccValMean; //색상 이름
    private List<String> cmValMean; //중분류 이름(원피스,아우터...)
    private List<String> csType; //사이즈 타입



}
