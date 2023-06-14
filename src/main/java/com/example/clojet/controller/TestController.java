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
                .map(Categorymid::getCm_valmean)
                .collect(Collectors.toList());

        List<String> cc_type = categorycolorList.stream()
                .map(Categorycolor::getCc_type)
                .collect(Collectors.toList());

        List<String> cc_valmean = categorycolorList.stream()
                .map(Categorycolor::getCc_valmean)
                .toList();

        List<String> cs_type = categorysizeList.stream()
                .map(Categorysize::getCs_type)
                .toList();

        return Categorydto.builder()
                .cm_valmean(cmValmeanList)
                .cc_type(cc_type)
                .cs_type(cs_type)
                .cc_valmean(cc_valmean)
                .build();
    }
}
