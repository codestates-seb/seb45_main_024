package com.seb45main24.server.domain.accountprofile.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.accountprofile.dto.TechTagDto;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.ProfileTechTag;
import com.seb45main24.server.domain.accountprofile.entity.SoftSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.domain.accountprofile.repository.HardSkillRepository;
import com.seb45main24.server.domain.accountprofile.repository.ProfileTechTagRepository;
import com.seb45main24.server.domain.accountprofile.repository.SoftSkillRepository;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.accountprofile.repository.TechTagRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagsService {
	private final HardSkillRepository hardSkillRepository;
	private final SoftSkillRepository softSkillRepository;
	private final TechTagRepository techTagRepository;
	private final AccountProfileRepository accountProfileRepository;
	private final ProfileTechTagRepository profileTechTagRepository;

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

	@Transactional
	public void createTechTags(List<Long> techTagIds, Long accountProfileId) {

		List<TechTag> techTags = techTagIds.stream()
			.map(tagId -> techTagRepository.findById(tagId)
				.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND)))
			.collect(Collectors.toList());

		List<ProfileTechTag> existingTag = profileTechTagRepository.findByAccountProfileId(accountProfileId);
		profileTechTagRepository.deleteAll(existingTag);

		// AccountProfile 객체를 가져옴
		AccountProfile accountProfile = accountProfileRepository.findById(accountProfileId)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));

		// ProfileTechTag 객체 생성 및 연결
		for (TechTag techTag : techTags) {
			ProfileTechTag profileTechTag = new ProfileTechTag();
			profileTechTag.setTechTag(techTag);
			profileTechTag.setAccountProfile(accountProfile);

			// ProfileTechTag 객체를 데이터베이스에 저장
			profileTechTagRepository.save(profileTechTag);
		}
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
	public ProfileTechTag createTechTagDefault() {
		ProfileTechTag profileTechTag = new ProfileTechTag();
		profileTechTag.setAccountProfile(null);
		profileTechTag.setTechTag(null);

		return profileTechTagRepository.save(profileTechTag);
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

	public void createProfileTechTag(AccountProfile accountProfile) {
		ProfileTechTag emptyTechTag = createTechTagDefault();

		emptyTechTag.setAccountProfile(accountProfile);
		emptyTechTag.setTechTag(null);

		profileTechTagRepository.save(emptyTechTag);
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

	public List<String> findHardSkillTag(Long accountProfileId) {
		List<HardSkillTag> hardSkillTags = hardSkillRepository.findByAccountProfileId(accountProfileId);

		List<String> hardTagNames = hardSkillTags.stream()
											.map(HardSkillTag::getTagName)
											.collect(Collectors.toList());
		return hardTagNames;
	}

	public List<String> findSoftSkillTag(Long accountProfileId) {
		List<SoftSkillTag> softSkillTags = softSkillRepository.findByAccountProfileId(accountProfileId);

		List<String> softTagNames = softSkillTags.stream()
											.map(SoftSkillTag::getTagName)
											.collect(Collectors.toList());
		return softTagNames;

	}

	public List<TechTagDto> findTechTags(Long accountProfileId) {
		List<ProfileTechTag> profileTechTags = profileTechTagRepository.findByAccountProfileId(accountProfileId);
		List<TechTagDto> techTagDtos = new ArrayList<>();

		for (ProfileTechTag profileTechTag : profileTechTags) {
			TechTag techTag = profileTechTag.getTechTag();
			if (techTag != null) {
				TechTagDto techTagDto = new TechTagDto(techTag.getId(), techTag.getTechName(), techTag.getTagType());
				techTagDtos.add(techTagDto);
			} else {
				return techTagDtos;
			}
		}
		return techTagDtos;
	}

	public List<TechTag> findAllTechTag() {
		List<TechTag> techTagList = techTagRepository.findAll();
		return techTagList;
	}

	@Transactional
	public void deleteProfileTechTags(AccountProfile accountProfile) {
		List<ProfileTechTag> techTags = profileTechTagRepository.findByAccountProfileId(accountProfile.getId());
		profileTechTagRepository.deleteAll(techTags);
	}

}