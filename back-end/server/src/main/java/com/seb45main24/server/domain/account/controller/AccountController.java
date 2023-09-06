package com.seb45main24.server.domain.account.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
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
		URI location = UriCreator.createUri(USER_DEFAULT_URL, createAccount.getId());

		return ResponseEntity.created(location).build();
	}


	@PatchMapping("/{account-id}")
	public ResponseEntity patchAccount(@PathVariable("account-id") Long accountId,
										@LoginAccountId Long loginAccountId,
										@RequestBody @Valid AccountPatchDto patchDto) {

		Account account = mapper.accountPatchDtoToAccount(patchDto);
		account.setId(accountId);
		accountService.updateAccount(account, loginAccountId);

		return ResponseEntity.ok("Update successful");
	}

	@DeleteMapping("/{account-id}")
	public ResponseEntity deleteAccount(@PathVariable("account-id") Long accountId, @LoginAccountId Long loginAccountId) {

		Account findAccount = accountService.findAccount(accountId);
		accountService.verifyAuthority(findAccount, loginAccountId);
		accountService.deleteAccount(findAccount);

		return ResponseEntity.ok("Delete successful");
	}
}
