package com.seb45main24.server.domain.account.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.mapper.AccountMapper;
import com.seb45main24.server.domain.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/accounts")
public class AccountController {
	private final static String USER_DEFAULT_URL = "/users";
	private final AccountService accountService;
	private final AccountMapper mapper;


	@PostMapping("/signup")
	public ResponseEntity postAccount(@RequestBody AccountDto.Post postDto) {

		Account createAccount = accountService.createAccount(mapper.userPostDtoToUser(postDto));
		URI location = UriComponentsBuilder.newInstance().build(USER_DEFAULT_URL, createAccount.getId());

		return ResponseEntity.created(location).build();
	}
}
