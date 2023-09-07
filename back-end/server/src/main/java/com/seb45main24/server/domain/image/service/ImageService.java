package com.seb45main24.server.domain.image.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.image.dto.ImageResponseDto;
import com.seb45main24.server.domain.image.dto.ImageUploadDto;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

	private final ImageRepository imageRepository;
	private final AccountRepository accountRepository;

	@Value("${multipart.profileImages.path}") // /Users/gimjaehui/Desktop/profileImages
	private String uploadFolder;


	public void upload(MultipartFile multipartFile, String email) {
		Account account = accountRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

		UUID uuid = UUID.randomUUID();
		String imageFileName = uuid + "_" + multipartFile.getOriginalFilename();

		File destinationFile = new File(uploadFolder + "/" +imageFileName );

		try {
			multipartFile.transferTo(destinationFile);

			Image image = imageRepository.findByAccount(account);
			if(image != null) {
				image.updateUrl("/profileImages/" + "/" +imageFileName);
			} else {
				// 이미지가 없으면 객체 생성 후 저장
				image = Image.builder()
					.account(account)
					.url("/profileImages/" + "/" + imageFileName)
					.build();
			}

			imageRepository.save(image);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}


	public ImageResponseDto findImage(String email) {
		Account account = accountRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
		Image image = imageRepository.findByAccount(account);

		String defaultImageUrl = "/profileImages/default.png";

		if(image == null) {
			return ImageResponseDto.builder()
					.url(defaultImageUrl)
					.build();
		} else {
			return ImageResponseDto.builder()
					.url(image.getUrl())
					.build();
		}
	}

}
