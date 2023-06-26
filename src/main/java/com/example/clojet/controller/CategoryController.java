package com.example.clojet.controller;

import com.example.clojet.domain.*;
import com.example.clojet.dto.Categorydto;
import com.example.clojet.service.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategorymidService categorymidService;
    private final CategorytopService categorytopService;
    private final Categorycolorservice categorycolorservice;
    private final Categorysizeservice categorysizeservice;
    private final GenderService genderService;



    @GetMapping("/category")
    public Categorydto getFindAll(){
        List<Categorytop> categorytopList = categorytopService.findTop();
        List<Categorymid> categorymidList = categorymidService.findMid();
        List<Categorycolor> categorycolorList = categorycolorservice.findColor();
        List<Categorysize> categorysizeList = categorysizeservice.findSize();
        List<Gender> genderList = genderService.findGender();


        List<String> ctGrpList = categorytopList.stream()
                .map(Categorytop::getCtGrp)
                .collect(Collectors.toList());

        List<String> ctValMeanList = categorytopList.stream()
                .map(Categorytop::getCtValMean)
                .collect(Collectors.toList());

        List<String> cmGrpList = categorymidList.stream()
                .map(Categorymid::getCmGrp)
                .collect(Collectors.toList());

        List<String> cmValmeanList = categorymidList.stream()
                .map(Categorymid::getCmValMean)
                .collect(Collectors.toList());

        List<String> ccType = categorycolorList.stream()
                .map(Categorycolor::getCcType)
                .collect(Collectors.toList());

        List<String> ccValMean = categorycolorList.stream()
                .map(Categorycolor::getCcValMean)
                .toList();

        List<String> csType = categorysizeList.stream()
                .map(Categorysize::getCsType)
                .toList();

        List<String> genderCodeList = genderList.stream()
                .map(Gender::getGenderCode)
                .toList();

        List<String> genderMeanList = genderList.stream()
                .map(Gender::getGenderMean)
                .toList();

        return Categorydto.builder()
                .ctGrp(ctGrpList)
                .ctValMean(ctValMeanList)
                .cmGrp(cmGrpList)
                .cmValMean(cmValmeanList)
                .ccType(ccType)
                .ccValMean(ccValMean)
                .csType(csType)
                .genderCode(genderCodeList)
                .genderMean(genderMeanList)
                .build();
    }
}
