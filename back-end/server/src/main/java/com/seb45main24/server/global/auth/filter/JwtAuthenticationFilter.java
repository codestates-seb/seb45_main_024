package com.seb45main24.server.global.auth.filter;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.global.auth.dto.LoginDto;
import com.seb45main24.server.global.auth.jwt.JwtTokenizer;

import lombok.SneakyThrows;

/** 클라이언트의 로그인 인증 요청을 처리하는 엔트리포인트 역할을 하는 JwtAuthenticationFilter **/

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final JwtTokenizer jwtTokenizer;


	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenizer = jwtTokenizer;
	}

	@SneakyThrows
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) { // 인증을 시도하는 로직
		ObjectMapper objectMapper = new ObjectMapper();
		LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // LoginDto 객체로 역직렬화(readValue() 사용)

		UsernamePasswordAuthenticationToken authenticationToken =
											new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()); // 토큰 생성

		return authenticationManager.authenticate(authenticationToken); // 인증처리는 authenticationManager에게 위임
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, // 클라이언트의 인증 정보 이용해 인증에 성공할 경우 호출
											HttpServletResponse response,
											FilterChain chain,
											Authentication authResult) {
		Account account = (Account) authResult.getPrincipal();

		String accessToken = delegateAccessToken(account);
		String refreshToken = delegateRefreshToken(account);

		response.setHeader("Authorization", "Bearer " + accessToken);
		response.setHeader("Refresh", refreshToken);
	}

	private String delegateAccessToken(Account account) { // accessToken 생성
		Map<String, Object> claims = new HashMap<>();

		claims.put("id", account.getId());
		claims.put("username", account.getEmail());
		claims.put("password", account.getPassword());

		String subject = account.getEmail();

		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
		String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

		return accessToken;
	}

	private String delegateRefreshToken(Account account) { // refreshToken 생성
		String subject = account.getEmail();
		Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

		String refreshToken = jwtTokenizer.generatedRefreshToken(subject, expiration, base64EncodedSecretKey);

		return refreshToken;
	}
}
