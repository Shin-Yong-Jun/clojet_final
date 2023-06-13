package com.example.clojet.service;

import com.example.clojet.domain.Categorysize;
import com.example.clojet.repository.CategorysizeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class Categorysizeservice {
    private final CategorysizeRepository categorysizeRepository;
    public List<Categorysize> findSize(){
        return categorysizeRepository.findAll();

    }



}
