package com.example.clojet.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
public class WebController {
    @RequestMapping({"/*"})
    public ResponseEntity<String> getIndex() {
        // "/index"에 대한 요청을 처리하는 메서드입니다.

        // index.html 파일을 리소스로 로드하기 위해 ClassPathResource를 사용합니다.
        Resource resource = new ClassPathResource("static/index.html");
        try {
            File file = resource.getFile();
            // 파일의 내용을 문자열로 읽어옵니다.
            String content = new String(Files.readAllBytes(file.toPath()));
            // 응답으로 내용을 포함한 ResponseEntity를 반환합니다.
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            e.printStackTrace();
            // 파일 로드 또는 읽기에 실패한 경우, 서버 오류로 응답합니다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
