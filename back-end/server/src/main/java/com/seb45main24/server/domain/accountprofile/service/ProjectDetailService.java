package com.seb45main24.server.domain.accountprofile.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.accountprofile.repository.ProjectDetailsRepository;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectDetailService {

	private final AccountProfileRepository accountProfileRepository;
	private final ProjectDetailsRepository projectDetailsRepository;

	@Transactional
	public List<ProjectDetails> createProjectDetails(List<ProjectDetailRequest> detailRequests, Long accountProfileId) {
		AccountProfile accountProfile = findAccountProfile(accountProfileId);

		List<ProjectDetails> existingProjectDetailTags = projectDetailsRepository.findByAccountProfileId(accountProfile.getId());
		existingProjectDetailTags.forEach(tag -> projectDetailsRepository.delete(tag));

		List<ProjectDetails> projectDetailsList = new ArrayList<>();

		for (ProjectDetailRequest detailRequest : detailRequests) {
			ProjectDetails projectDetails = new ProjectDetails();
			projectDetails.setProjectTitle(detailRequest.getProjectTitle());
			projectDetails.setProjectUrl(detailRequest.getProjectUrl());
			projectDetails.setImageUrl(detailRequest.getImageUrl());
			projectDetails.setAccountProfile(accountProfile);

			projectDetailsList.add(projectDetails);
		}
		return projectDetailsRepository.saveAll(projectDetailsList);
	}

	// 회원 등록시 기본값 생성을 위한 메서드
	public ProjectDetails createDefault() {
		// ProjectDetail 엔티티 생성 및 빈 값으로 초기화
		ProjectDetails projectDetails = new ProjectDetails();
		projectDetails.setProjectTitle("");
		projectDetails.setProjectUrl("");
		projectDetails.setImageUrl("");
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

	public AccountProfile findAccountProfile(Long accountProfileId) {
		Optional<AccountProfile> optional = accountProfileRepository.findById(accountProfileId);

		if (optional.isPresent()) {
			AccountProfile accountProfile = optional.get();
			return accountProfile;
		}
		throw new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT);
	}
}