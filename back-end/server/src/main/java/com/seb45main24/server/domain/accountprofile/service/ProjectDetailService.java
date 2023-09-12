package com.seb45main24.server.domain.accountprofile.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.repository.ProjectDetailsRepository;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectDetailService {

	private final ImageUtils imageUtils;
	private final ImageRepository imageRepository;
	private final ProjectDetailsRepository projectDetailsRepository;

	public List<ProjectDetails> createProjectDetails(List<ProjectDetailRequest> detailRequests, List<MultipartFile> multipartFiles) {
		List<ProjectDetails> projectDetailsList = new ArrayList<>();

		if (detailRequests != null && multipartFiles != null) {
			for (int i = 0; i < detailRequests.size(); i++) {
				ProjectDetailRequest detailRequest = detailRequests.get(i);
				MultipartFile file = multipartFiles.get(i);

				// 이미지 업로드 및 이미지 정보 저장
				UploadImage uploadImage = imageUtils.uploadImage(file);
				Image image = Image.builder()
					.urlPath(uploadImage.getUrlPath())
					.originName(uploadImage.getOriginName())
					.size(uploadImage.getSize())
					.imageClsf(Image.ImageClassification.PROJECT_IMG)
					.build();

				Image savedImage = imageRepository.save(image);

				// ProjectDetail 엔티티 생성 및 이미지 정보 연결
				ProjectDetails projectDetails = new ProjectDetails();
				projectDetails.setProjectTitle(detailRequest.getProjectTitle());
				projectDetails.setProjectUrl(detailRequest.getProjectUrl());
				projectDetails.setImage(savedImage);

				projectDetailsList.add(projectDetails);
				projectDetailsRepository.save(projectDetails);
			}

		}
		return projectDetailsList;
	}

	// 회원 등록시 기본값 생성을 위한 메서드
	public ProjectDetails createDefault() {
		// ProjectDetail 엔티티 생성 및 빈 값으로 초기화
		ProjectDetails projectDetails = new ProjectDetails();
		projectDetails.setProjectTitle("");
		projectDetails.setProjectUrl("");
		projectDetails.setImage(null);
		projectDetails.setCreatedAt(LocalDateTime.now());

		// ProjectDetail을 저장
		return projectDetailsRepository.save(projectDetails);
	}

	// 계정 프로필과 연결된 빈 ProjectDetails 생성 및 저장
	public ProjectDetails createEmptyProjectDetail(AccountProfile accountProfile) {
		ProjectDetails emptyProjectDetail = createDefault();

		// 계정 프로필과 연결
		emptyProjectDetail.setAccountProfile(accountProfile);

		// ProjectDetail 저장
		return projectDetailsRepository.save(emptyProjectDetail);
	}
}