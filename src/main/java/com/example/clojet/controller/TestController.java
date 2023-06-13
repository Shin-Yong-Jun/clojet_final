package com.example.clojet.controller;

import com.example.clojet.domain.Categorymid;
import com.example.clojet.service.CategorymidService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class TestController {
    private final CategorymidService categorymidService;

    @GetMapping("/category")
    public List<Categorymid> getFindAll(){

        return categorymidService.findCategory();
    }
}
