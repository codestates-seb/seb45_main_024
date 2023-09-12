package com.seb45main24.server.domain.image.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.mapper.ImageMapper;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
	private final ImageRepository imageRepository;
	private final AccountProfileRepository accountProfileRepository;
	private final ImageUtils imageUtils;
	private final ImageMapper mapper;

	@Transactional
	public void projectUpload(MultipartFile multipartFile) {

		if (multipartFile.isEmpty()) {
			return;
		}

		UploadImage uploadImage = imageUtils.uploadImage(multipartFile);
		uploadImage.setImageClsf("PROJECT_IMG");

		Image updateImage = mapper.uploadImageToImage(uploadImage);

		imageRepository.save(updateImage);
	}
}

