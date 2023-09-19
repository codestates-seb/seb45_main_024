package com.seb45main24.server.domain.account.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.service.TeamBoardService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;
import com.seb45main24.server.domain.accountprofile.repository.ProfileTechTagRepository;
import com.seb45main24.server.domain.accountprofile.service.AccountProfileService;
import com.seb45main24.server.domain.accountprofile.service.TagsService;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.domain.reviews.service.ReviewService;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import com.seb45main24.server.global.file.service.AwsS3Service;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class AccountService {
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;
	private final CustomAuthorityUtils authorityUtils;
	private final ImageRepository imageRepository;
	private final AwsS3Service awsS3Service;
	private final AccountProfileRepository accountProfileRepository;
	private final AccountProfileService accountProfileService;
	private final TagsService tagsService;
	private final TeamBoardService teamBoardService;

	public Account createAccount(Account account) {

		checkDuplicateEmail(account.getEmail());
		checkDuplicateNickname(account.getNickname());

		// 패스워드 암호화
		String encryptedPassword = passwordEncoder.encode(account.getPassword());
		account.setPassword(encryptedPassword);

		List<String> roles = authorityUtils.createRoles(account.getEmail());
		account.setRoles(roles);

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

	public Account updateAccount(Account account, Long loginAccountId) {

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

		if(account.getImage() != null) {
			findAccount.getImage().setImageUrl(account.getImage().getImageUrl());
			findAccount.getImage().setImageName(account.getImage().getImageName());
			findAccount.getImage().setModifiedAt(LocalDateTime.now());
		}

		return accountRepository.save(findAccount);
	}

	@Transactional
	public void deleteAccount(Account findAccount) {
		Account account = accountRepository.findById(findAccount.getId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

		if (account != null) {
			AccountProfile accountProfile = account.getAccountProfile();
			if (accountProfile != null) {
				tagsService.deleteProfileTechTags(accountProfile); // projectTechTag 삭제
			}
		}

		deleteAllTeamBoardByAccountId(account.getId());

		accountRepository.delete(findAccount);
	}

	public void deleteAllTeamBoardByAccountId(Long accountId) {
		List<TeamBoard> teamBoardList = teamBoardService.getTeamBoards(accountId);

		teamBoardList.stream().forEach(teamBoard -> {
			teamBoardService.deleteTeamBoard(teamBoard.getTeamBoardId());
		});
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
		String defaultUrl = awsS3Service.getDefaultProfileImageUrl();

		return Image.builder()
			.imageName("default-profile.png")
			.imageType("PROFILE_IMG")
			.imageUrl(defaultUrl)
			.build();
	}
}
