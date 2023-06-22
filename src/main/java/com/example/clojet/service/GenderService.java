package com.example.clojet.service;

import com.example.clojet.domain.Gender;
import com.example.clojet.repository.GenderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GenderService {
    private final GenderRepository genderRepository;


    public List<Gender> findGender() {
        return genderRepository.findAll();
    }




}
