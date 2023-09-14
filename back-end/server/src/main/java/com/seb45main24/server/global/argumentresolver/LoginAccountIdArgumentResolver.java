package com.seb45main24.server.global.argumentresolver;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.seb45main24.server.global.auth.dto.TokenPrincipalDto;

public class LoginAccountIdArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) { // 메서드 파라미터가 Argument Resolver에서 지원하는 타입인지 검사, 지원하면 true 아니면 false
		boolean haLoginAccountIdAnnotation = parameter.hasParameterAnnotation(LoginAccountId.class);
		boolean hasLongType = Long.class.isAssignableFrom(parameter.getParameterType());

		return haLoginAccountIdAnnotation && hasLongType;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
									NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if(principal == "anonymousUser") {
			return -1L;
		}

		TokenPrincipalDto tokenPrincipal = (TokenPrincipalDto) principal;

		return tokenPrincipal.getId();
	}
}
