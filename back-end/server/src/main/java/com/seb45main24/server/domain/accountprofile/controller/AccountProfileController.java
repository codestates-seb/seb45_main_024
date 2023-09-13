package com.seb45main24.server.domain.accountprofile.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProfileResponse;
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

	private final AccountProfileService accountProfileService;

	@PatchMapping("/profile/{account-profile-id}")
	public ResponseEntity patchAccountProfile(@LoginAccountId Long loginAccountId,
												@PathVariable("account-profile-id") Long accountProfileId,
												@RequestBody @Valid ProfilePostRequest postRequest) {

		accountProfileService.updateAccountProfile(loginAccountId, accountProfileId, postRequest);
		ProfileResponse response = accountProfileService.findAccountProfile(loginAccountId, accountProfileId);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/profile/{account-profile-id}")
	public ResponseEntity getAccountProfile(@LoginAccountId Long loginAccountId, @PathVariable("account-profile-id") Long accountProfileId) {

		ProfileResponse response = accountProfileService.findAccountProfile(loginAccountId, accountProfileId);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/profile/{account-id}")
	public ResponseEntity getMyPost(@LoginAccountId Long longinAccountId, @PathVariable("account-id") Long accountId) {
		return null;
	}
}