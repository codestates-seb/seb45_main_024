package com.seb45main24.server.domain.account.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class AccountDto {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Post {

		@NotBlank
		@Size(min = 2, max = 7, message = "닉네임은 2글자 이상 7글자 이하여야 합니다.")
		private String nickname;

		@NotBlank
		@Pattern(regexp = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
			message = "이메일 형식에 맞지 않습니다.")
		private String email;

		@NotBlank
		@Pattern(regexp = "^.{5,}",
			message = "비밀번호는 5글자 이상이어야 한다.")
		private String password;

	}

}
