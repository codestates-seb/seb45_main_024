package com.seb45main24.server.global.auth.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.seb45main24.server.global.auth.dto.TokenPrincipalDto;
import com.seb45main24.server.global.auth.jwt.JwtTokenizer;
import com.seb45main24.server.global.auth.refreshtoken.entity.RefreshToken;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;

import io.jsonwebtoken.Claims;
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
		Map<String, Object> claims = verifyJws(request);
		setAuthenticationToContext(claims);

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

	// Security Context에 Authentication 저장
	private void setAuthenticationToContext(Map<String, Object> claims) {
		String email = (String)claims.get("username");
		Long id = Long.valueOf((Integer) claims.get("id"));
		List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
		Authentication authentication = new UsernamePasswordAuthenticationToken(new TokenPrincipalDto(id, email), null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
