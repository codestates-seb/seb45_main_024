package com.seb45main24.server.global.auth.filter;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.core.json.UTF8DataInputJsonParser;
import com.google.gson.Gson;
import com.seb45main24.server.global.auth.dto.TokenPrincipalDto;
import com.seb45main24.server.global.auth.jwt.JwtTokenizer;
import com.seb45main24.server.global.auth.refreshtoken.entity.RefreshToken;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.dto.ErrorResponse;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtTokenizer jwtTokenizer;
	private final CustomAuthorityUtils authorityUtils;

	public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
		this.jwtTokenizer = jwtTokenizer;
		this.authorityUtils = authorityUtils;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain) throws ServletException, IOException {

	try {
		Map<String, Object> claims = verifyJws(request);
		setAuthenticationToContext(claims);
	} catch (ExpiredJwtException e) {
		response.setStatus(HttpStatus.FORBIDDEN.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding("UTF-8");
		String errorMessage = "{\"error\":\"토큰이 만료되었습니다.\"}";
		response.getWriter().write(errorMessage);
		response.getWriter().flush();
		return;

	}

		filterChain.doFilter(request, response);

	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String authorization = request.getHeader("Authorization");

		return authorization == null || !authorization.startsWith("Bearer");
	}

	// jwt 검증 메서드 -- accessToken에 대한 검증
	private Map<String, Object> verifyJws(HttpServletRequest request) {
		String jws = request.getHeader("Authorization").replace("Bearer", "");
		String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
		Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

		return claims;
	}

	// 토큰 만료 시간 검증
	private void checkTokenExpiration(Map<String, Object> claims) {
		Object expiration = claims.get("exp");
		if (expiration instanceof Integer) {
			Integer expirationSeconds = (Integer) expiration;
			Date expirationDate = new Date(expirationSeconds * 1000L); // 초를 밀리초로 변환
			Date now = new Date();
			if (expirationDate.before(now)) {
				throw new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_EXPIRATION);
			}
		}
	}

	// Security Context에 Authentication 저장
	private void setAuthenticationToContext(Map<String, Object> claims) {
		String email = (String)claims.get("username");
		Long id = Long.valueOf((Integer) claims.get("id"));
		List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
		Authentication authentication = new UsernamePasswordAuthenticationToken(new TokenPrincipalDto(id, email), null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
