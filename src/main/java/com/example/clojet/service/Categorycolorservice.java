package com.example.clojet.service;

import com.example.clojet.domain.Categorymid;
import com.example.clojet.repository.CategorymidRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorymidService {
    private final CategorymidRepository categorymidRepository;

    public List<Categorymid> findCategory(){
        return categorymidRepository.findAll();

    }



}
