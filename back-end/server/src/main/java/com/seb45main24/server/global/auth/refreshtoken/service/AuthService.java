package com.seb45main24.server.global.auth.refreshtoken.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seb45main24.server.global.auth.jwt.JwtTokenizer;
import com.seb45main24.server.global.auth.refreshtoken.entity.RefreshToken;
import com.seb45main24.server.global.auth.refreshtoken.repository.RefreshTokenRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final JwtTokenizer jwtTokenizer;
	private final RefreshTokenRepository refreshTokenRepository;


	public String validateRefreshToken(String refreshToken, String expAccessToken) {
		RefreshToken refreshToken1 = getRefreshToken(refreshToken);
		String createdAccessToken = jwtTokenizer.validateRefreshToken(refreshToken1, expAccessToken);

		// 기존에 데이터베이스에 저장된 리프레쉬 토큰 삭제
		refreshTokenRepository.delete(refreshToken1);

		return "Bearer " + createdAccessToken;
	}

	public RefreshToken getRefreshToken(String refreshToken) { // 해당하는 refresh token이 존재하지 않으면 유효하지 않은 토큰
		return refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow(
									() -> new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
	}

	// DB에 리프레쉬 토큰 저장
	public void saveRefreshToken(String refreshToken, String email) {
		RefreshToken refresh = new RefreshToken();
		refresh.setRefreshToken(refreshToken);
		refresh.setKeyEmail(email);
		refreshTokenRepository.save(refresh);
	}

}
