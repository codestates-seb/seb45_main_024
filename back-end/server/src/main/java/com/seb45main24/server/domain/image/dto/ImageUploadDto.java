package com.seb45main24.server.domain.image.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ImageUploadDto {

	private MultipartFile file;
}
