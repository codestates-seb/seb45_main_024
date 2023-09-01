package com.seb45main24.server.global.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {

	private int status;

	private String exception;

	private String message;

}
