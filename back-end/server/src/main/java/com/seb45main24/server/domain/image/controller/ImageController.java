package com.seb45main24.server.domain.image.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.image.service.ImageService;
import com.seb45main24.server.global.argumentresolver.LoginEmailArgumentResolver;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class ImageController {

	private final ImageService imageService;


	@PostMapping("/upload")
	public ResponseEntity uploadProfileImage(@RequestPart("multipartFile") MultipartFile multipartFile) {
		String accountEmail	= LoginEmailArgumentResolver.getEmail();
		imageService.upload(multipartFile, accountEmail);

		return ResponseEntity.ok("Upload successful");
	}
}
