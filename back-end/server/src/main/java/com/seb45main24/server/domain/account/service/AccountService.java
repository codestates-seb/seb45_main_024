package com.seb45main24.server.domain.account.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.repository.ImageRepository;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AccountService {
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;
	private final CustomAuthorityUtils authorityUtils;
	private final ImageRepository imageRepository;

	@Transactional
	public Account createAccount(Account account) {

		checkDuplicateEmail(account.getEmail());
		checkDuplicateNickname(account.getNickname());

		// 패스워드 암호화
		String encryptedPassword = passwordEncoder.encode(account.getPassword());
		account.setPassword(encryptedPassword);

		List<String> roles = authorityUtils.createRoles(account.getEmail());
		account.setRoles(roles);

		// 디폴트 이미지 넣기
		Image image = Image.builder()
						.url("/profileImages/default.png")
						.account(account)
						.build();

		System.out.println("이미지 생성 완료!");
		Account postAccount = accountRepository.save(account);
		imageRepository.save(image);

		return postAccount;
	}


	// 아이디(이메일) 중복 검사
	private void checkDuplicateEmail(String email) {
		Optional<Account> optionalUser = accountRepository.findByEmail(email);

		if(optionalUser.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
		}
	}

	// 닉네임 중복 검사
	private void checkDuplicateNickname(String nickname) {
		Optional<Account> optionalNickname = accountRepository.findByNickname(nickname);

		if(optionalNickname.isPresent()) {
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
}
