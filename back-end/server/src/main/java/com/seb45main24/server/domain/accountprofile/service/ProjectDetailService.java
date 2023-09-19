package com.seb45main24.server.domain.accountprofile.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.mapper.ProjectDetailsMapper;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.accountprofile.repository.ProjectDetailsRepository;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.file.service.AwsS3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectDetailService {

	private final AccountProfileRepository accountProfileRepository;
	private final ProjectDetailsRepository projectDetailsRepository;
	private final ProjectDetailsMapper projectDetailsMapper;
	private final ImageRepository imageRepository;


	@Transactional
	public ProjectDetails createProjectDetails(Long accountId, ProjectDetailRequest request) {
		AccountProfile accountProfile = findAccountProfileById(accountId);

		// ProjectDetailRequest에서 필요한 정보 추출
		String projectTitle = request.getProjectTitle();
		String projectUrl = request.getProjectUrl();
		Image image = Image.builder()
			.imageName(request.getUploadImage().getImageName())
			.imageType("PROJECT_IMG")
			.imageUrl(request.getUploadImage().getImageUrl())
			.build();

		// Image 엔터티를 저장
		Image savedImage = imageRepository.save(image);

		// ProjectDetails 엔터티 생성 및 저장
		ProjectDetails projectDetails = new ProjectDetails();
		projectDetails.setProjectTitle(projectTitle);
		projectDetails.setProjectUrl(projectUrl);
		projectDetails.setAccountProfile(accountProfile);
		projectDetails.setImage(savedImage); // Image와 연결

		return projectDetailsRepository.save(projectDetails);
	}

	// 회원 등록시 기본값 생성을 위한 메서드
	public ProjectDetails createDefault() {
		// ProjectDetail 엔티티 생성 및 빈 값으로 초기화
		ProjectDetails projectDetails = new ProjectDetails();
		projectDetails.setProjectTitle("");
		projectDetails.setProjectUrl("");
		projectDetails.setCreatedAt(LocalDateTime.now());

		// ProjectDetail을 저장
		return projectDetailsRepository.save(projectDetails);
	}

	public void deleteProjectDetail(Long projectDetailId) {
		ProjectDetails findProjectDetail = findProjectDetailById(projectDetailId);

		projectDetailsRepository.delete(findProjectDetail);
	}



	public ProjectDetails findProjectDetailById(Long projectDetailId) {
		Optional<ProjectDetails> optional = projectDetailsRepository.findById(projectDetailId);

		if(optional.isEmpty()) {
			throw  new BusinessLogicException(ExceptionCode.NOT_FOUND);
		}

		return optional.get();
	}


	// 계정 프로필과 연결된 빈 ProjectDetails 생성 및 저장
	public ProjectDetails createEmptyProjectDetail(AccountProfile accountProfile) {
		ProjectDetails emptyProjectDetail = createDefault();

		// 계정 프로필과 연결
		emptyProjectDetail.setAccountProfile(accountProfile);

		// ProjectDetail 저장
		return projectDetailsRepository.save(emptyProjectDetail);
	}

	public AccountProfile findAccountProfile(Long accountProfileId) {
		Optional<AccountProfile> optional = accountProfileRepository.findById(accountProfileId);

		if (optional.isPresent()) {
			AccountProfile accountProfile = optional.get();
			return accountProfile;
		}
		throw new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT);
	}

	public List<ProjectDetailResponse> findProjectDetails(Long accountProfileId) {
		List<ProjectDetails> projectDetails = projectDetailsRepository.findByAccountProfileId(accountProfileId);

		List<ProjectDetailResponse> projectDetailsList = projectDetails.stream()
																.map(projectDetailsMapper::toProjectDetailResponse)
																.collect(Collectors.toList());

		return projectDetailsList;
	}

	private AccountProfile findAccountProfileById(Long accountId) {
		Optional<AccountProfile> optional = accountProfileRepository.findAccountProfileByAccountId(accountId);

		if (optional.isPresent()) {
			AccountProfile accountProfile = optional.get();
			return accountProfile;
		}
		throw new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT);
	}
}