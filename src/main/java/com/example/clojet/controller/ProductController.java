package com.example.clojet.controller;

import com.example.clojet.domain.Product;
import com.example.clojet.domain.ProductAll;
import com.example.clojet.repository.ProductAllRepository;
import com.example.clojet.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductAllRepository productAllRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestParam("productThumUrl") MultipartFile productThumUrl,
                                           @RequestParam("productDetail") MultipartFile productDetail,
                                           @RequestParam("productName") String productName,
                                           @RequestParam("genderCode") String genderCode,
                                           @RequestParam("productPrice") String productPrice,
                                           @RequestParam("ccType") String ccType,
                                           @RequestParam("csType") String csType,
                                           @RequestParam("ctGrp") String ctGrp,
                                           @RequestParam("cmGrp") String cmGrp,
                                           @RequestParam("productEnroll") String productEnroll,
                                           @RequestParam("ccCsText") String[] ccCsText,
                                           @RequestParam("ccCsQty") int[] ccCsQty) {
        try {
            // 파일 저장 처리
            String uploadedThumImgPath = saveUpThumFile(productThumUrl);
            String uploadedDetailImgPath = saveUpDetailFile(productDetail);

            // Product 객체 생성
            Product product = new Product();
            product.setProductThumUrl(uploadedThumImgPath);
            product.setProductDetail(uploadedDetailImgPath);
            product.setProductName(productName);
            product.setGenderCode(genderCode);
            product.setProductPrice(productPrice);
            product.setCcType(ccType);
            product.setCsType(csType);
            product.setCtGrp(ctGrp);
            product.setCmGrp(cmGrp);
            product.setProductEnroll(productEnroll);

            // productStock 처리
            int totalQty = 0; // ccCsQty의 합을 저장할 변수
            StringBuilder productStockBuilder = new StringBuilder();

            for (int i = 0; i < ccCsText.length; i++) {
                productStockBuilder.append(ccCsText[i]).append(":").append(ccCsQty[i]);

                // ccCsQty의 값을 totalQty에 더해줍니다.
                totalQty += ccCsQty[i];

                if (i < ccCsText.length - 1) {
                    productStockBuilder.append(",");
                }
            }

            String productStock = productStockBuilder.toString();
            product.setProductStock(totalQty); // 합계 값을 product의 productStock에 설정합니다.

            Product createdProduct = productService.createProduct(product);

            String[] makeColor = product.getCcType().split(",");
            String[] makeSize = product.getCsType().split(",");

            List<ProductAll> list = new ArrayList<>(makeSize.length * makeColor.length);

            Long seq = product.getProductSeq();
            for (String color : makeColor) {
                for (String size : makeSize) {
                    list.add(new ProductAll(seq, color, size));
                }
            }

            productAllRepository.saveAll(list);
            return ResponseEntity.ok(createdProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    private String saveUpThumFile(MultipartFile file) {

        // 파일을 저장하고 저장된 파일 경로를 반환하는 로직을 구현합니다.
        // 예를 들어, Spring의 MultipartFile.transferTo() 메서드를 사용하여 저장할 수 있습니다.
        // 저장된 파일 경로를 반환합니다.
        // 저장할 폴더 경로
        String folderPath = "src/main/resources/productThumImage";

        // 저장할 파일명 생성
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = StringUtils.getFilenameExtension(fileName);
        String newFileName = UUID.randomUUID().toString() + "." + fileExtension;

        // 파일 저장 경로
        String filePath = folderPath + File.separator + newFileName;

        // 파일을 저장할 폴더 생성 (이미 존재하는 경우 생략 가능)
        new File(folderPath).mkdirs();

        // 파일을 저장
        Path destinationPath = Path.of(filePath);
        try {
            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 저장된 파일 경로를 반환
        return "productThumImage/" + newFileName;
    }

    private String saveUpDetailFile(MultipartFile file) {

        // 파일을 저장하고 저장된 파일 경로를 반환하는 로직을 구현합니다.
        // 예를 들어, Spring의 MultipartFile.transferTo() 메서드를 사용하여 저장할 수 있습니다.
        // 저장된 파일 경로를 반환합니다.
        // 저장할 폴더 경로
        String folderPath = "src/main/resources/productDetailImage";

        // 저장할 파일명 생성
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = StringUtils.getFilenameExtension(fileName);
        String newFileName = UUID.randomUUID().toString() + "." + fileExtension;

        // 파일 저장 경로
        String filePath = folderPath + File.separator + newFileName;

        // 파일을 저장할 폴더 생성 (이미 존재하는 경우 생략 가능)
        new File(folderPath).mkdirs();

        // 파일을 저장
        Path destinationPath = Path.of(filePath);
        try {
            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 저장된 파일 경로를 반환
        return "productDetailImage/" + newFileName;
    }


//    @PostMapping("/create")
//    public ResponseEntity<?> createProduct(@RequestBody Product product) {
//        try{
//            Product createdProduct = productService.createProduct(product);
//
//            String[] makeColor = product.getCcType().split(",");
//            String[] makeSize = product.getCsType().split(",");
//
//            List<ProductAll> list = new ArrayList<>(makeSize.length * makeColor.length);
//
//            Long seq = product.getProductSeq();
//            for(String color : makeColor){
//                for(String size : makeSize){
//                    list.add(new ProductAll(seq, color, size));
//                }
//            }
//
//            productAllRepository.saveAll(list);
//            return ResponseEntity.ok(createdProduct);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/list")
    public List<Product> readAll() {return productService.getAllProducts();}



}
