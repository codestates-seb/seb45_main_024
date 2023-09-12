package com.seb45main24.server.domain.accountprofile.service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.entity.SoftSkillTag;
import com.seb45main24.server.domain.accountprofile.mapper.AccountProfileMapper;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.utils.UriCreator;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountProfileService {

	private final AccountProfileRepository accountProfileRepository;
	private final ProjectDetailService projectDetailService;
	private final TagsService tagsService;
	private final AccountProfileMapper mapper;

	public AccountProfile updateAccountProfile(Long loginAccountId, Long accountId, ProfilePostRequest postRequest) {

		if (loginAccountId.equals(accountId)) {
			AccountProfile accountProfile = mapper.requestToAccountProfile(postRequest);
			accountProfile.setId(accountId);

			AccountProfile findProfile = verifiedAccountProfile(accountProfile.getId());

			Optional.ofNullable(accountProfile.getCoverLetter())
				.ifPresent(coverLetter -> findProfile.setCoverLetter(coverLetter));

			accountProfile.setModifiedAt(LocalDateTime.now());

			if (postRequest.getHardSkills() != null) {
				List<HardSkillTag> hardSkillTags = tagsService.createHardSkillTags(postRequest.getHardSkills(), accountId);
				accountProfile.setHardSkillTags(hardSkillTags);
			}

			if (postRequest.getSoftSkills() != null) {
				List<SoftSkillTag> softSkillTags = tagsService.createSoftSkillTags(postRequest.getSoftSkills(), accountId);
				accountProfile.setSoftSkillTags(softSkillTags);
			}

			// if (multipartFiles != null) {
			// 	List<ProjectDetails> projectDetailsList = projectDetailService.createProjectDetails(postRequest.getProjectDetails(), multipartFiles);
			// 	accountProfile.setProjectDetails(projectDetailsList);
			// }


			return accountProfileRepository.save(accountProfile);
		}
		throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);

	}

	private AccountProfile verifiedAccountProfile(Long accountProfileId) {
		Optional<AccountProfile> optionalAccountProfile = accountProfileRepository.findById(accountProfileId);

		return optionalAccountProfile.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
	}

	public AccountProfile findAccountProfile(Long accountId) {
		return findVerifiedAccountProfile(accountId);
	}

	private AccountProfile findVerifiedAccountProfile(Long accountId) {
		Optional<AccountProfile> optionalAccountProfile = accountProfileRepository.findAccountProfileByAccountId(accountId);

		AccountProfile findAccountProfile = optionalAccountProfile.orElseThrow(() ->
			new BusinessLogicException(ExceptionCode.NOT_FOUND));

		return findAccountProfile;
	}

	// 회원 가입시 기본 계정 프로필 생성하기
	public AccountProfile createAccountProfile(Account postAccount) {

		AccountProfile accountProfile = AccountProfile.builder()
			.account(postAccount)
			.coverLetter("")
			.hardSkillTags(new ArrayList<>())
			.softSkillTags(new ArrayList<>())
			.projectDetails(new ArrayList<>())
			.build();

		ProjectDetails projectDetails = projectDetailService.createEmptyProjectDetail(accountProfile);
		accountProfile.getProjectDetails().add(projectDetails);

		SoftSkillTag softSkillTag = tagsService.createEmptySoftSkillTag(accountProfile);
		accountProfile.getSoftSkillTags().add(softSkillTag);

		HardSkillTag hardSkillTag = tagsService.createEmptyHardSkillTag(accountProfile);
		accountProfile.getHardSkillTags().add(hardSkillTag);

		return accountProfile;

	}


}
