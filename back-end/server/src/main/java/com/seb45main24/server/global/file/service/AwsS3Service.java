package com.seb45main24.server.global.file.service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

/**
 * 입력받은 파일데이터(이미지를) S3에 저장하고 이미지 경로는 DB에 저장
 **/

@Service
@RequiredArgsConstructor
public class AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.s3.endpoint}")
	private String s3EndPoint;

	private final AmazonS3 amazonS3;


	// MultipartFile 들어오면 File로 변경해줘야 함 -> S3에서 MultipartFile 지원하지 않음
	public List<String> uploadImages(List<MultipartFile> multipartFile) {
		String dirName = "images";
		List<String> fileNameList = new ArrayList<>(); // 파일 이름을 저장할 리스트

		multipartFile.forEach(file -> {
			// 업로드할 파일의 기존 이름을 기반으로 새로운 파일 이름 생성, 중복 피하기
			String fileName = dirName + "/" + createFileName(file.getOriginalFilename());
			// 업로드될 객체의 메타데이터를 나타내는 객체 생성
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(file.getSize());
			objectMetadata.setContentType(file.getContentType());

			try (InputStream inputStream = file.getInputStream()) { // 파일에서 데이터를 읽기 위한 InputStream 열기
				// Amazon S3 객체를 사용하여 파일 업로드 (위치, 파일명, 데이터, 메타데이터)
				amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead)); // S3 객체에 대한 액세스 권한 생성, 공개 읽기 가능
			} catch (IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
			}
			fileNameList.add(fileName);
		});

		List<String> fileUrls = urlToString(fileNameList);

		return fileUrls;
	}

	public UploadImage uploadImage(MultipartFile multipartFile) {
		String dirName = "images";
		String fileName = dirName + "/" + createFileName(multipartFile.getOriginalFilename());
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(multipartFile.getSize());
		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));

		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String imageUrl = amazonS3.getUrl(bucket, fileName).toString(); // DB에는 저장된 경로를 저장

		return UploadImage.builder()
			.imageName(fileName)
			.imageUrl(imageUrl)
			.createdAt(LocalDateTime.now())
			.build();
	}


	public UploadImage uploadProjectImage(MultipartFile multipartFile) {
		String dirName = "images";
		String fileName = dirName + "/" + createFileName(multipartFile.getOriginalFilename());
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(multipartFile.getSize());
		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));

		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String imageUrl = amazonS3.getUrl(bucket, fileName).toString(); // DB에는 저장된 경로를 저장

		return UploadImage.builder()
			.imageName(fileName)
			.imageUrl(imageUrl)
			.imageType("PROJECT_IMG")
			.createdAt(LocalDateTime.now())
			.build();
	}



	// 이미지 수정시 데이터베이스와 버킷 내부에서 이미지 삭제하고 새로 업로드
	public UploadImage updateImage(MultipartFile newImage, String fileName) {

		if (!fileName.equals("default-profile.png")) {
			// 현재 이미지 삭제
			deleteImage(fileName);

			// 새로운 이미지 업로드
			UploadImage uploadImage = uploadImage(newImage);

			return uploadImage;
		}
		// 디폴트 이미지는 버킷에서 삭제하지 않고 이미지만 변경
		UploadImage uploadImage = uploadImage(newImage);

		return uploadImage;
	}

	public void deleteImage(String fileName) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
	}

	// 디폴트 프로필 이미지 경로 가져오기 위한 메서드
	public String getDefaultProfileImageUrl() {
		String imageFileName = "default-profile.png";
		String imageFileUrl = s3EndPoint + "/images/" + imageFileName;

		return imageFileUrl;
	}

	// 고유한 파일 이름 생성, 중복 방지
	private String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	// 확장자를 추출하기 위한 메서드
	private String getFileExtension(String fileName) {
		try {
			return fileName.substring(fileName.lastIndexOf(".")); // 점 이후의 문자 추출
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}

	// String url 리스트 만들기
	private List<String> urlToString(List<String> fileNameList) {
		List<String> fileUrls = new ArrayList<>();
		for (String fileName : fileNameList) {
			String fileUrlString = amazonS3.getUrl(bucket, fileName).toString();
			fileUrls.add(fileUrlString);
		}
		return fileUrls;
	}
}
