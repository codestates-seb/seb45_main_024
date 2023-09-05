package com.seb45main24.server.domain.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPatchDto {

	private String nickname;

	private String profile;

	private String password;
}
