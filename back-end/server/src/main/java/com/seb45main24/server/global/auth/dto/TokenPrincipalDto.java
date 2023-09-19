package com.seb45main24.server.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenPrincipalDto {
	private Long id;
	private String email;
}
