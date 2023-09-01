package com.seb45main24.server.domain.account.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
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

	@Transactional
	public Account createAccount(Account account) {
		// 1. 존재하는 이메일이 있는지 확인
		verifyExistsEmail(account.getEmail());

		// 패스워드 암호화
		String encryptedPassword = passwordEncoder.encode(account.getPassword());
		account.setPassword(encryptedPassword);

		List<String> roles = authorityUtils.createRoles(account.getEmail());
		account.setRoles(roles);

		Account postAccount = accountRepository.save(account);

		return postAccount;
	}

	public void verifyExistsEmail(String email) {
		Optional<Account> optionalUser = accountRepository.findByEmail(email);

		if(optionalUser.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
		}

	}
}
