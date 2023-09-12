package com.seb45main24.server.domain.accountprofile.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.SoftSkillTag;
import com.seb45main24.server.domain.accountprofile.repository.HardSkillRepository;
import com.seb45main24.server.domain.accountprofile.repository.SoftSkillRepository;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagsService {
	private final HardSkillRepository hardSkillRepository;
	private final SoftSkillRepository softSkillRepository;
	private final AccountProfileRepository accountProfileRepository;

	@Transactional
	public List<SoftSkillTag> createSoftSkillTags(List<String> softSkillNames, Long accountProfileId) {
		AccountProfile accountProfile = findAccountProfile(accountProfileId);

		List<SoftSkillTag> existingSoftSkillTags = softSkillRepository.findByAccountProfileId(accountProfile.getId());
		existingSoftSkillTags.forEach(tag -> softSkillRepository.delete(tag));

		// 새로운 데이터 추가
		List<SoftSkillTag> newSoftSkillTags = new ArrayList<>();
		for (String softSkillName : softSkillNames) {
			SoftSkillTag newTag = new SoftSkillTag();
			newTag.setTagName(softSkillName);
			newTag.setAccountProfile(accountProfile);
			newSoftSkillTags.add(newTag);
		}

		return softSkillRepository.saveAll(newSoftSkillTags);
	}

	@Transactional
	public List<HardSkillTag> createHardSkillTags(List<String> hardSkillNames, Long accountProfileId) {
		AccountProfile accountProfile = findAccountProfile(accountProfileId);

		List<HardSkillTag> existingHardSkillTags = hardSkillRepository.findByAccountProfileId(accountProfile.getId());
		existingHardSkillTags.forEach(tag -> hardSkillRepository.delete(tag));

		// 새로운 데이터 추가
		List<HardSkillTag> newHardSkillTags = new ArrayList<>();
		for (String hardSkillName : hardSkillNames) {
			HardSkillTag newTag = new HardSkillTag();
			newTag.setTagName(hardSkillName);
			newTag.setAccountProfile(accountProfile);
			newHardSkillTags.add(newTag);
		}

		return hardSkillRepository.saveAll(newHardSkillTags);
	}

	public AccountProfile findAccountProfile(Long accountProfileId) {
		Optional<AccountProfile> optional = accountProfileRepository.findById(accountProfileId);

		if (optional.isPresent()) {
			AccountProfile accountProfile = optional.get();
			return accountProfile;
		}
		throw new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT);
	}

	// 회원 등록시 기본값 생성을 위한 메서드
	public SoftSkillTag createSoftDefault() {
		SoftSkillTag softSkillTag = new SoftSkillTag();
		softSkillTag.setTagName(null);
		softSkillTag.setCreatedAt(LocalDateTime.now());

		return softSkillRepository.save(softSkillTag);
	}

	// 회원 등록시 기본값 생성을 위한 메서드
	public HardSkillTag createHardDefault() {
		HardSkillTag hardSkillTag = new HardSkillTag();
		hardSkillTag.setTagName(null);
		hardSkillTag.setCreatedAt(LocalDateTime.now());

		return hardSkillRepository.save(hardSkillTag);
	}

	public SoftSkillTag createEmptySoftSkillTag(AccountProfile accountProfile) {
		SoftSkillTag emptySoftSkill = createSoftDefault();

		emptySoftSkill.setAccountProfile(accountProfile);

		return softSkillRepository.save(emptySoftSkill);
	}

	public HardSkillTag createEmptyHardSkillTag(AccountProfile accountProfile) {
		HardSkillTag emptyHardSkill = createHardDefault();

		emptyHardSkill.setAccountProfile(accountProfile);

		return hardSkillRepository.save(emptyHardSkill);
	}

}
