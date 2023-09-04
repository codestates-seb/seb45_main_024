package com.seb45main24.server.domain.emailpassword.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.seb45main24.server.domain.emailpassword.service.EmailService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/accounts")
public class EmailController {

	private final EmailService emailService;

	@PostMapping("/sendMail")
	public ResponseEntity sendMail(@RequestParam("email") String email) {
		emailService.createMailAndUpdatePassword(email);

		return new ResponseEntity(HttpStatus.OK);
	}

	}

