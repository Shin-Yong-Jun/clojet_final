package com.example.clojet.service;

import com.example.clojet.domain.Categorycolor;
import com.example.clojet.repository.CategorycolorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class Categorycolorservice {
    private final CategorycolorRepository categorycolorRepository;

    public List<Categorycolor> findCategory(){
        return categorycolorRepository.findAll();

    }



}
