package com.seb45main24.server.global.utils;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.image.dto.UploadImage;

@Component
public class ImageUtils {

	@Value("${multipart.upload.path}")
	private String uploadPath;

	@Value("${multipart.default.path}")
	private String defaultPath;

	// 다중 파일 업로드
	// public List<UploadImage> uploadImages(List<MultipartFile> multipartFiles) {
	// 	List<UploadImage> images = new ArrayList<>();
	// 	for(MultipartFile multipartFile : multipartFiles) {
	// 		if(multipartFile.isEmpty()) {
	// 			continue;
	// 		}
	// 		images.add(uploadImage(multipartFile));
	// 	}
	//
	// 	return images;
	// }


	// 단일 파일 업로드
	public UploadImage uploadImage(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			return null;
		}
		System.out.println("오리진 이름 : " + multipartFile.getOriginalFilename());
		System.out.println("사이즈 : " + multipartFile.getSize());

		String saveName = generatedSaveImageName(multipartFile.getOriginalFilename());
		String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd")).toString();
		String uploadPath = getUploadPath(today) + File.separator + saveName;

		File uploadFile = new File(uploadPath);

		try {
			multipartFile.transferTo(uploadFile);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		UploadImage uploadImage = UploadImage.builder()
									.originName(multipartFile.getOriginalFilename())
									.saveName(saveName)
									.imageUrl(uploadFile.getPath())
									.size(multipartFile.getSize())
									.createdAt(LocalDateTime.now())
									.build();

		return uploadImage;
	}

	// 이미지 수정하기(이미지 업데이트 할 때 기존 이미지 삭제)
	public UploadImage uploadImage(MultipartFile newImage, String currentImagePath) {
		// 현재 이미지 삭제
		deleteImage(currentImagePath);

		// 새로운 이미지 업로드
		UploadImage uploadImage = uploadImage(newImage);

		return uploadImage;
	}

	// 이미지 삭제하기
	public void deleteImage(String imagePath) {
		if(imagePath != null && !imagePath.isEmpty()) {
			File imageFile = new File(imagePath);
			if(imageFile.exists()) {
				imageFile.delete();
			}
		}
	}


	// // 이미지 읽어오기
	// public byte[] readImage(String imagePath) throws IOException {
	// 	File imageFile = new File(imagePath);
	// 	return Files.readAllBytes(imageFile.toPath());
	// }

	// 저장 파일명 생성
	public String generatedSaveImageName(String imageName) {
		String uuid = UUID.randomUUID().toString().replaceAll("-","");
		String extension = StringUtils.getFilenameExtension(imageName);

		return uuid + "." + extension;
	}


	// 업로드 경로 반환
	private String getUploadPath() {
		return makeDirectories(uploadPath);
	}

	// 업로드 경로 + 추가 경로 반환
	private String getUploadPath(String addPath) {
		return makeDirectories(uploadPath + File.separator + addPath);
	}

	// 업로드 폴더 생성
	private String makeDirectories(String path) {
		File dir = new File(path);
		if(dir.exists() == false) {
			dir.mkdirs();
		}
		return dir.getPath();
	}

	// 디폴트 이미지 파일의 이름만 반환하는 메서드
	public String getDefaultImageFileName() {
		File file = new File(defaultPath);
		return file.getName();
	}

	// 디폴트 이미지 사이즈 구하는 메서드
	public long getImageSize() {
		try {
			File file = new File(defaultPath);

			if(file.exists() && file.isFile()) {
				return file.length();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
}
