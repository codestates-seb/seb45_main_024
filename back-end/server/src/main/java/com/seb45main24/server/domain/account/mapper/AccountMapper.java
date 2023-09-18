package com.seb45main24.server.domain.account.mapper;

import org.mapstruct.Mapper;

import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
import com.seb45main24.server.domain.account.dto.AccountPatchResponseDto;
import com.seb45main24.server.domain.account.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {

	Account accountPostDtoToAccount(AccountDto.Post postDto);
	Account accountPatchDtoToAccount(AccountPatchDto patchDto);

	default AccountPatchResponseDto AccountPatchToResponseDto(Account updateAccount) {
		AccountPatchResponseDto accountPatchResponseDto = AccountPatchResponseDto.builder()

			.imageUrl(updateAccount.getImage().getImageUrl())
			.nickname(updateAccount.getNickname())
			.email(updateAccount.getEmail())
			.build();

		return accountPatchResponseDto;
	}
}
