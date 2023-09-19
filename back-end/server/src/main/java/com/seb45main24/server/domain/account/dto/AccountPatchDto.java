package com.seb45main24.server.domain.account.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPatchDto {

	private Long accountId; // 수정하려는 회원번호

	@Size(min = 2, max = 7, message = "닉네임은 2글자 이상 7글자 이하여야 합니다.")
	private String nickname;

	@Pattern(regexp = "^.{5,}",
		message = "비밀번호는 5글자 이상이어야 한다.")
	private String password;

	private String imageUrl;

	private String imageName;

	public void addAccountId(Long accountId) {
		this.accountId = accountId;
	}

}
