package com.seb45main24.server.domain.mypage.service;

import org.springframework.stereotype.Service;

import com.seb45main24.server.domain.mypage.entity.AccountProfile;
import com.seb45main24.server.domain.mypage.repository.AccountProfileRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountProfileService {

	private final AccountProfileRepository accountProfileRepository;


	public AccountProfile createAccountProfile(AccountProfile accountProfile) {


		return accountProfileRepository.save(accountProfile);
	}
}
