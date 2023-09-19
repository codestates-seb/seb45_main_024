package com.seb45main24.server.global.exception.advice;


import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException {

	@Getter
	private ExceptionCode exceptionCode;

	public BusinessLogicException(ExceptionCode exceptionCode) {
		super(exceptionCode.getMessage());
		this.exceptionCode = exceptionCode;
	}
}
