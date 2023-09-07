package com.seb45main24.server.domain.accountprofile.service;

import org.springframework.stereotype.Service;

import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.repository.AccountProfileRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountProfileService {

	private final AccountProfileRepository accountProfileRepository;


	public AccountProfile createAccountProfile(AccountProfile accountProfile) {


		return accountProfileRepository.save(accountProfile);
	}
}
