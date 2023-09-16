package com.seb45main24.server.global.auth.refreshtoken.controller;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seb45main24.server.global.auth.refreshtoken.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/issue")
	public ResponseEntity refreshAccessToken(HttpServletResponse response, @RequestBody Map<String, String> refresh) {

		String newToken = authService.validateRefreshToken(refresh.get("Refresh"));

		response.setHeader("newAccessToken",newToken);

		return new ResponseEntity<>(HttpStatus.OK);

	}
}

