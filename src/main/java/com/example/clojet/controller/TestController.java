package com.example.clojet.controller;

import com.example.clojet.domain.Categorymid;
import com.example.clojet.dto.Categorydto;
import com.example.clojet.service.Categorycolorservice;
import com.example.clojet.service.CategorymidService;
import com.example.clojet.service.Categorysizeservice;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class TestController {
    private final CategorymidService categorymidService;
    private final Categorycolorservice categorycolorservice;
    private final Categorysizeservice categorysizeservice;
    @GetMapping("/category")
    public List<Categorydto> getFindAll(){
        Categorydto categorydto = Categorydto.builder()
                .cc_valmean(categorycolorservice.findColor().toString())
                .cm_valmean(categorymidService.findMid().toString())
                .cs_type(categorysizeservice.findSize().toString())
                .cc_type(categorycolorservice.findColor().toString())
                .build();

        return (List<Categorydto>) categorydto;
    }
}
