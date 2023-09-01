package com.seb45main24.server.domain.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AccountDto {

	@Getter
	@Setter
	public static class Post {

		private String nickname;

		private String email;

		private String password;

	}

}
