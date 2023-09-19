package com.seb45main24.server.global.auth.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.seb45main24.server.global.auth.refreshtoken.entity.RefreshToken;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;

@Component
public class JwtTokenizer {
	@Getter
	@Value("${jwt.key}")
	private String secretKey;

	@Getter
	@Value("${jwt.access-token-expiration-minutes}")
	private int accessTokenExpirationMinutes;

	@Getter
	@Value("${jwt.refresh-token-expiration-minutes}")
	private int refreshTokenExpirationMinutes;

	public String encodeBase64SecretKey(String secretKey) { // plain 형태인 key의 바이트를 Base64형식의 문자열로 인코딩
		return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
	}

	public String generateAccessToken(Map<String, Object> claims, // 인증된 사용자에게 JWT를 발급해주기 위한 JWT 생성 메서드
		String subject,
		Date expiration,
		String base64EncodedSecretKey) {
		Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // SecretKey 이용해서 객체 얻기

		return Jwts.builder()
			.setClaims(claims) // 인증된 사용자와 관련된 정보 추가
			.setSubject(subject) // JWT에 대한 제목
			.setIssuedAt(Calendar.getInstance().getTime()) // JWT 발행 일자
			.setExpiration(expiration) // 만료일시
			.signWith(key) // 서명을 위한 객체 설정
			.compact(); // JWT 생성하고 직렬화
	}

	public String generatedRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) { // 리프레쉬 토큰생성
		Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

		return Jwts.builder()
			.setSubject(subject)
			.setIssuedAt(Calendar.getInstance().getTime())
			.setExpiration(expiration)
			.signWith(key)
			.compact();
	}

	public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) { // JWT 내에 저장된 클레임(사용자와 관련된 정보, 즉 페이로드) 파싱하고 가져오는 메서드
		Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

		Jws<Claims> claims = Jwts.parserBuilder()
			.setSigningKey(key) // 서명을 확인하고 토큰이 변조되지 않았음을 보장
			.build()
			.parseClaimsJws(jws);

		return claims; // 인증된 사용자나 토큰의 페이로드에 포함된 다양한 정보에 대한 접근에 사용될 수 있음
	}

	public void verifySignature(String jws, String base64EncodedSecretKey) { // 서명 검증을 수행하는 용도
		Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

		Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(jws);
	}

	public Date getTokenExpiration(int expirationMinutes) { // JWT의 만료 일시를 지정하기 위한 메서드 JWT 생성시 사용
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MINUTE, expirationMinutes);
		Date expiration = calendar.getTime();

		return expiration;
	}


	private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) { // JWT의 서명에 사용할 Secret Key를 생성하는 메서드
		byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey); // Base64형식으로 인코딩 된 Secret Key를 디코딩 후 byte array 반환
		Key key = Keys.hmacShaKeyFor(keyBytes); // key byte array를 기반으로 적절한 HAMAC 알고리즘을 적용한 Key 객체 생성

		return key;
	}

	public String validateRefreshToken(RefreshToken token, String expAccessToken) {
		String refreshToken = token.getRefreshToken(); // 저장된 리프레시 토큰 가져오기
		Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));

			Claims claims = Jwts.parser()
				.setSigningKey(key)
				.parseClaimsJws(refreshToken)
				.getBody();

			try {
				// refresh 토큰의 만료시간이 지나지 않았을 경우 새로운 access 토큰 생성
				if (!claims.getExpiration().before(new Date())) {
					return recreationAccessToken(expAccessToken);
				}

			} catch (Exception e) {
				// refresh 토큰이 만료되었을 경우 로그인 필요
				throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRATION);
			}
			throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
	}


	public String recreationAccessToken(String expAccessToken) {

		String accessToken = extractAccessTokenFromHeader(expAccessToken);

		// 기존 액세스 토큰에서 사용자 정보를 가져와서 새로운 액세스 토큰에 추가
		Jws<Claims> existingAccessTokenClaims = getNewClaims(accessToken, getSecretKey());

		// 클래임을 이용하여 새로운 액세스 토큰 생성
		String newAccessToken = delegateNewAccessToken(existingAccessTokenClaims.getBody());

		return newAccessToken;
	}

	private String delegateNewAccessToken(Claims existingClaims) {
		// 기존 액세스 토큰에서 추출한 클레임을 사용하여 새로운 액세스 토큰 생성
		Map<String, Object> newClaims = new HashMap<>();
		newClaims.putAll(existingClaims);

		String subject = existingClaims.getSubject();
		Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
		String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

		String newAccessToken = generateAccessToken(newClaims, subject, expiration, base64EncodedSecretKey);

		return newAccessToken;
	}

	private String extractAccessTokenFromHeader(String expAccessToken) {
		// "Bearer " 다음의 토큰 부분 추출
		if (expAccessToken != null && expAccessToken.startsWith("Bearer ")) {
			return expAccessToken.replace("Bearer ", "");
		}
		throw new BusinessLogicException(ExceptionCode.NOT_FOUND);
	}

	private Jws<Claims> getNewClaims(String jws, String base64EncodedSecretKey) {
		Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(base64EncodedSecretKey));

		Jws<Claims> claims = Jwts.parserBuilder()
			.setSigningKey(key) // 서명을 확인하고 토큰이 변조되지 않았음을 보장
			.build()
			.parseClaimsJws(jws);

		return claims;
	}
}

