package com.seb45main24.server.domain.account.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
public class AccountDto {

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Post {

		@NotBlank
		private String nickname;

		@NotBlank
		private String email;

		@NotBlank
		private String password;

	}

}
