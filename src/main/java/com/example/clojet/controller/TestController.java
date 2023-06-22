package com.example.clojet.controller;

import com.example.clojet.domain.Categorycolor;
import com.example.clojet.domain.Categorymid;
import com.example.clojet.domain.Categorysize;
import com.example.clojet.dto.Categorydto;
import com.example.clojet.service.Categorycolorservice;
import com.example.clojet.service.CategorymidService;
import com.example.clojet.service.Categorysizeservice;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class TestController {
    private final CategorymidService categorymidService;
    private final Categorycolorservice categorycolorservice;
    private final Categorysizeservice categorysizeservice;

    @GetMapping("/category")
    public Categorydto getFindAll(){
        List<Categorymid> categorymidList = categorymidService.findMid();
        List<Categorycolor> categorycolorList = categorycolorservice.findColor();
        List<Categorysize> categorysizeList = categorysizeservice.findSize();

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

        return Categorydto.builder()
                .cmValMean(cmValmeanList)
                .ccType(ccType)
                .csType(csType)
                .ccValMean(ccValMean)
                .build();
    }
}
