package com.seb45main24.server.domain.account.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
import com.seb45main24.server.domain.account.dto.AccountPatchResponseDto;
import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.mapper.AccountMapper;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/accounts")
public class AccountController {
	private final static String USER_DEFAULT_URL = "/accounts";
	private final AccountService accountService;
	private final AccountMapper mapper;


	@PostMapping("/signup")
	public ResponseEntity postAccount(@RequestBody @Valid AccountDto.Post postDto) {

		Account createAccount = accountService.createAccount(mapper.accountPostDtoToAccount(postDto));

		URI accountUri = UriCreator.createUri(USER_DEFAULT_URL, createAccount.getId());
		URI profileUri = UriCreator.createUri("/mypages/profile", createAccount.getAccountProfile().getId());

		// 경로 헤더에 계정 및 프로필 URI 추가
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(accountUri);
		headers.add("Profile-Uri", profileUri.toString());

		return new ResponseEntity(headers, HttpStatus.OK);
	}


	@PatchMapping("/{account-id}")
	public ResponseEntity patchAccount(@PathVariable("account-id") Long accountId,
		@LoginAccountId Long loginAccountId,
		@Valid AccountPatchDto patchDto,
		@RequestPart(required = false) MultipartFile newImage) {

		Account account = mapper.accountPatchDtoToAccount(patchDto);
		account.setId(accountId);
		Account updateAccount = accountService.updateAccount(account, loginAccountId, newImage);

		AccountPatchResponseDto patchDto1 = mapper.AccountPatchToResponseDto(updateAccount);

		return new ResponseEntity(patchDto1, HttpStatus.OK);
	}

	@DeleteMapping("/{account-id}")
	public ResponseEntity deleteAccount(@PathVariable("account-id") Long accountId, @LoginAccountId Long loginAccountId) {

		Account findAccount = accountService.findAccount(accountId);
		accountService.verifyAuthority(findAccount, loginAccountId);
		accountService.deleteAccount(findAccount);

		return ResponseEntity.ok("Delete successful");
	}
}
