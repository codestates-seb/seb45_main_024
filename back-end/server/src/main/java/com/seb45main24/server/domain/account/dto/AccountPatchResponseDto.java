package com.seb45main24.server.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountPatchResponseDto {
	private String imageUrl;
	private String email;
	private String nickname;
}
