package com.seb45main24.server.domain.account.mapper;

import org.mapstruct.Mapper;

import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
import com.seb45main24.server.domain.account.dto.AccountPatchResponseDto;
import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.image.entity.Image;

@Mapper(componentModel = "spring")
public interface AccountMapper {

	Account accountPostDtoToAccount(AccountDto.Post postDto);

	default Account accountPatchDtoToAccount(AccountPatchDto patchDto) {
		Account account = new Account();
		Image image = Image.builder()
					.imageName("")
					.imageUrl("")
					.imageType("PROFILE_IMG")
					.build();

		account.setImage(image);

		account.setId(patchDto.getAccountId());
		account.getImage().setImageUrl(patchDto.getImageUrl());
		account.getImage().setImageName(patchDto.getImageName());
		account.setNickname(patchDto.getNickname());
		account.setPassword(patchDto.getPassword());

		return account;
	}

	default AccountPatchResponseDto AccountPatchToResponseDto(Account updateAccount) {
		AccountPatchResponseDto accountPatchResponseDto = AccountPatchResponseDto.builder()

			.imageUrl(updateAccount.getImage().getImageUrl())
			.nickname(updateAccount.getNickname())
			.email(updateAccount.getEmail())
			.build();

		return accountPatchResponseDto;
	}
}
