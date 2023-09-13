package com.seb45main24.server.domain.accountprofile.service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProfileResponse;
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
	private final AccountRepository accountRepository;
	private final TagsService tagsService;
	private final AccountProfileMapper mapper;

	@Transactional
	public AccountProfile updateAccountProfile(Long loginAccountId, Long accountProfileId, ProfilePostRequest postRequest) {

			AccountProfile accountProfile = mapper.requestToAccountProfile(postRequest);
			Account account = findAccount(loginAccountId);
			AccountProfile findProfile = verifiedAccountProfile(accountProfileId);

			Optional.ofNullable(accountProfile.getCoverLetter())
				.ifPresent(coverLetter -> findProfile.setCoverLetter(coverLetter));

				findProfile.setModifiedAt(LocalDateTime.now());

			if (postRequest.getHardSkills() != null) {
				List<HardSkillTag> hardSkillTags = tagsService.createHardSkillTags(postRequest.getHardSkills(), accountProfileId);
				findProfile.setHardSkillTags(hardSkillTags);
			}

			if (postRequest.getSoftSkills() != null) {
				List<SoftSkillTag> softSkillTags = tagsService.createSoftSkillTags(postRequest.getSoftSkills(), accountProfileId);
				findProfile.setSoftSkillTags(softSkillTags);
			}

			if (postRequest.getProjectDetails() != null) {
				List<ProjectDetails> projectDetailsList = projectDetailService.createProjectDetails(postRequest.getProjectDetails(), accountProfileId);
				findProfile.setProjectDetails(projectDetailsList);
			}


			return accountProfileRepository.save(findProfile);
	}

	public ProfileResponse findAccountProfile(Long loginAccountId, Long accountProfileId) {
		Account findAccount = findAccount(loginAccountId);
		AccountProfile accountProfile = verifiedAccountProfile(accountProfileId);


		ProfileResponse profileResponse = ProfileResponse.builder()
			.imageUrl(findAccount.getImage().getImageUrl())
			.email(findAccount.getEmail())
			.nickname(findAccount.getNickname())
			.coverLetter(accountProfile.getCoverLetter())
			.hardSkills(tagsService.findHardSkillTag(accountProfileId))
			.softSkills(tagsService.findSoftSkillTag(accountProfileId))
			.projectDetails(projectDetailService.findProjectDetails(accountProfileId))
			.build();

		return profileResponse;

	}




	private Account findAccount(Long loginAccountId) {
		Optional<Account> optionalAccount = accountRepository.findById(loginAccountId);

		return optionalAccount.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
	}

	private AccountProfile verifiedAccountProfile(Long accountProfileId) {
		Optional<AccountProfile> optionalAccountProfile = accountProfileRepository.findById(accountProfileId);

		return optionalAccountProfile.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
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
