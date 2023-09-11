package com.seb45main24.server.domain.accountprofile.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.mapper.AccountProfileMapper;
import com.seb45main24.server.domain.accountprofile.service.AccountProfileService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypages")
public class AccountProfileController {

	private final static String ACCOUNT_PROFILE_DEFAULT_URL = "/mypages/profile";
	private final AccountProfileService accountProfileService;
	private final AccountProfileMapper mapper;
	private final AccountService accountService;


	@PostMapping("/profile")
	public ResponseEntity postAccountProfile(@LoginAccountId Long loginAccountId,
												@RequestBody @Valid AccountProfilePostDto postDto) {

		AccountProfile createProfile = accountProfileService.createAccountProfile(mapper.postDtoToAccountProfile(postDto));

		URI location = UriCreator.createUri(ACCOUNT_PROFILE_DEFAULT_URL, createProfile.getId());

		return ResponseEntity.created(location).build();


	}
}
