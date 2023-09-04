package com.seb45main24.server.global.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.google.gson.Gson;
import com.seb45main24.server.global.exception.dto.ErrorResponse;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

public class AccountAuthenticationFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
										HttpServletResponse response,
										AuthenticationException exception) throws IOException, ServletException {
		sendErrorResponse(response);
	}

	// 아이디나 비밀번호가 틀렸을 경우
	private void sendErrorResponse(HttpServletResponse response) throws IOException {
		Gson gson = new Gson();
		ExceptionCode exceptionCode = ExceptionCode.LOGIN_FAILURE;
		ErrorResponse errorResponse = new ErrorResponse(exceptionCode.getStatus(), "BusinessLogicException", exceptionCode.getMessage());
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.getWriter().write(gson.toJson(errorResponse));
	}
 }
