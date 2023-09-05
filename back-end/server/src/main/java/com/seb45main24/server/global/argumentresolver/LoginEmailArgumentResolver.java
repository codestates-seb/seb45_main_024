package com.seb45main24.server.global.argumentresolver;

import org.springframework.security.core.context.SecurityContextHolder;

import com.seb45main24.server.global.auth.dto.TokenPrincipalDto;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

public class LoginEmailArgumentResolver {
	public static String getEmail() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if(principal == "anonymousUser") {
			return ExceptionCode.NOT_FOUND.getMessage();
		}

		TokenPrincipalDto tokenPrincipal = (TokenPrincipalDto) principal;

		return tokenPrincipal.getEmail();
	}
}
