package com.seb45main24.server.global.auth.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
	private String message;

	public AuthResponse(String message) {
		this.message = message;
	}
}
