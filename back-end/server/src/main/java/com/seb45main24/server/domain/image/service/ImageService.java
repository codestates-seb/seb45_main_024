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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
	private final ImageRepository imageRepository;
	private final AccountProfileRepository accountProfileRepository;
	private final ImageMapper mapper;

	@Transactional
	public Image getImageFromImageUrl(String imageUrl) {
		// 이미지 URL을 사용하여 이미지를 데이터베이스에서 찾기
		Image existingImage = imageRepository.findByImageUrl(imageUrl)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));

		if (existingImage != null) {
			// 이미지가 이미 데이터베이스에 존재하면 해당 이미지를 반환한다.
			return existingImage;
		} else {
			// 이미지가 데이터베이스에 존재하지 않는 경우 새 이미지 엔터티를 생성한다.
			Image newImage = new Image();
			newImage.setImageUrl(imageUrl);

			// 이미지 저장 등 다른 필요한 설정을 수행한다.

			// 이미지를 데이터베이스에 저장한다.
			imageRepository.save(newImage);

			return newImage;
		}
	}
}

