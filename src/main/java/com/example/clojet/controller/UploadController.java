package com.example.clojet.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
public class UploadController {
    @Value("${com.example.upload.path}")
    private String uploadPath;

    @PostMapping("/uploadAjax")
    public void uploadFile(MultipartFile[] uploadFiles){

        for (MultipartFile uploadFile : uploadFiles) {

            // 이미지 파일만 업로드 가능
            if(uploadFile.getContentType().startsWith("image") == false){
                return;
            }

            // 실제 파일 이름 IE나 Edge는 전체 경로가 들어오므로
            String originalName = uploadFile.getOriginalFilename();

            String fileName = originalName.substring(originalName.lastIndexOf("\\") + 1);

            // 날짜 폴더 생성
            String folderPath = makeFolder();

            //UUID
            String uuid = UUID.randomUUID().toString();

            //저장할 파일 이름 중간에 "_"를 이용해 구분
            String saveName = uploadPath + File.separator + folderPath + File.separator + uuid + "_" + fileName;

            Path savePath = Paths.get(saveName);

            try {
                uploadFile.transferTo(savePath);
            }catch (IOException e){
                e.printStackTrace();
            }
        }
    }

    private String makeFolder() {

        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        String folderPath = str.replace("/", File.separator);

        // make folder ----
        File uploadPatheFolder = new File(uploadPath,folderPath);

        if(uploadPatheFolder.exists() == false){
            uploadPatheFolder.mkdirs();
        }

        return folderPath;
    }


    @GetMapping("/productThumImage/{imageName:.+}")
    public ResponseEntity<byte[]> getProductThumImage(@PathVariable String imageName) {
        try {
            // 이미지 파일을 로드하기 위해 ClassPathResource를 사용합니다.
            Resource resource = new ClassPathResource("productThumImage/" + imageName);
            File file = resource.getFile();

            // 이미지 파일을 바이트 배열로 읽어옵니다.
            byte[] imageBytes = Files.readAllBytes(file.toPath());

            // 이미지 파일의 MIME 타입을 확인합니다.
            String contentType = Files.probeContentType(file.toPath());

            // HTTP 응답에 바이트 배열과 MIME 타입을 설정하여 반환합니다.
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            // 파일 로드 또는 읽기에 실패한 경우, 서버 오류로 응답합니다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

