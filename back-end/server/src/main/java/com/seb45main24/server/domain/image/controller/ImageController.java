// package com.seb45main24.server.domain.image.controller;
//
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestPart;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;
//
// import com.seb45main24.server.domain.image.dto.UploadImage;
// import com.seb45main24.server.global.argumentresolver.LoginAccountId;
//
// import lombok.RequiredArgsConstructor;
//
// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/images")
// public class ImageController {
//
//
//
// 	@PostMapping("/upload")
// 	public ResponseEntity uploadProjectImage(@RequestPart("multipartFile") MultipartFile multipartFile) {
//
// 		imageService.projectUpload(multipartFile);
//
// 		return ResponseEntity.ok("Upload successful");
// 	}
// }
