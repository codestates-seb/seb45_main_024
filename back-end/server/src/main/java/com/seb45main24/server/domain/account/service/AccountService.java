package com.seb45main24.server.domain.account.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.accountprofile.service.AccountProfileService;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class AccountService {
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;
	private final CustomAuthorityUtils authorityUtils;
	private final ImageRepository imageRepository;
	private final ImageUtils imageUtils;
	private final AccountProfileRepository accountProfileRepository;
	private final AccountProfileService accountProfileService;

	@Value("${multipart.default.path}")
	private String defaultPath;

	public Account createAccount(Account account) {

		checkDuplicateEmail(account.getEmail());
		checkDuplicateNickname(account.getNickname());

		// 패스워드 암호화
		String encryptedPassword = passwordEncoder.encode(account.getPassword());
		account.setPassword(encryptedPassword);

		List<String> roles = authorityUtils.createRoles(account.getEmail());
		account.setRoles(roles);

		String fileName = imageUtils.getDefaultImageFileName();

		// 디폴트 이미지 넣기
		Image defaultImage = createDefaultImage();

		// 이미지와 계정 연결
		account.setImage(defaultImage);
		imageRepository.save(defaultImage);

		Account postAccount = accountRepository.save(account);

		// 계정 프로필 생성
		AccountProfile accountProfile = accountProfileService.createAccountProfile(postAccount);
		postAccount.setAccountProfile(accountProfile);
		accountProfileRepository.save(accountProfile);

		return postAccount;
	}

	public Account updateAccount(Account account, Long loginAccountId, MultipartFile newImage) {

		Account findAccount = findAccount(account.getId());
		verifyAuthority(findAccount, loginAccountId);

		Optional.ofNullable(account.getNickname()).ifPresent(nickname -> {
			checkDuplicateNickname(nickname);
			findAccount.setNickname(nickname);
		});
		Optional.ofNullable(account.getPassword()).ifPresent(password -> {
			String encodedPassword = passwordEncoder.encode(password);
			findAccount.setPassword(encodedPassword);
		});

		if (newImage != null && !newImage.isEmpty()) {
			UploadImage uploadImage = imageUtils.uploadImage(newImage, findAccount.getImage().getImageUrl());
			if (uploadImage != null) {
				findAccount.getImage().setOriginName(uploadImage.getOriginName());
				findAccount.getImage().setSize(uploadImage.getSize());
				findAccount.getImage().setImageUrl(uploadImage.getImageUrl());
			}
		}

		return accountRepository.save(findAccount);
	}

	public void deleteAccount(Account findAccount) {
		accountRepository.delete(findAccount);
	}

	public Account findAccount(Long accountId) {
		Optional<Account> optionalAccount = accountRepository.findById(accountId);
		return optionalAccount.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
	}

	// 로그인 한 사용자와 일치하는지 확인
	public void verifyAuthority(Account findAccount, Long loginAccountId) {
		if (!findAccount.getId().equals(loginAccountId)) {
			throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);
		}
	}

	// 아이디(이메일) 중복 검사
	private void checkDuplicateEmail(String email) {
		Optional<Account> optionalUser = accountRepository.findByEmail(email);

		if (optionalUser.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
		}
	}

	// 닉네임 중복 검사
	private void checkDuplicateNickname(String nickname) {
		Optional<Account> optionalNickname = accountRepository.findByNickname(nickname);

		if (optionalNickname.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
		}
	}

	// 임시 비밀번호로 바꾸기
	@Transactional
	public void changePassword(String tmpPassword, Long accountId) {
		Account info = accountRepository.findById(accountId).orElseThrow(() ->
			new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
		// 임시 비밀번호로 업데이트
		info.setPassword(tmpPassword);

		// 임시 비밀번호 암호화
		String encryptedPassword = passwordEncoder.encode(info.getPassword());
		info.setPassword(encryptedPassword);

		accountRepository.save(info);
	}

	// 디폴트 이미지 생성하기
	private Image createDefaultImage() {
		String fileName = imageUtils.getDefaultImageFileName();

		return Image.builder()
			.originName(fileName)
			.saveName(imageUtils.generatedSaveImageName(fileName))
			.size(imageUtils.getImageSize())
			.createdAt(LocalDateTime.now())
			.imageClsf(Image.ImageClassification.PROFILE_IMG)
			.imageUrl(defaultPath)
			.build();
	}
}
