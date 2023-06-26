package com.example.clojet.service;

import com.example.clojet.domain.Categorymid;
import com.example.clojet.domain.Categorytop;
import com.example.clojet.repository.CategorymidRepository;
import com.example.clojet.repository.CategorytopRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorytopService {
    private final CategorytopRepository categorytopRepository;


    public List<Categorytop> findTop() {
        return categorytopRepository.findAll();
    }




}
