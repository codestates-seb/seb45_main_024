package com.seb45main24.server.global.file.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.global.file.service.AwsS3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/S3")
public class AmazonS3Controller {

	private final AwsS3Service awsS3Service;

	@PostMapping("/images")
	public ResponseEntity uploadImages(@RequestPart List<MultipartFile> multipartFiles) {
		return new ResponseEntity(awsS3Service.uploadImages(multipartFiles), HttpStatus.OK);
	}

	@PostMapping("/image")
	public ResponseEntity uploadImage(@RequestPart(required = false) MultipartFile multipartFile) {
		return new ResponseEntity(awsS3Service.uploadImage(multipartFile), HttpStatus.OK);
	}
	@PostMapping("/projectImage")
	public ResponseEntity uploadProjectImage(@RequestPart(required = false) MultipartFile multipartFile) {
		return new ResponseEntity(awsS3Service.uploadProjectImage(multipartFile), HttpStatus.OK);
	}
}
