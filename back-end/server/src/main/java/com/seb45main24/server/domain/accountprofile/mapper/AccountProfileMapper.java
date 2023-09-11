package com.seb45main24.server.domain.accountprofile.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;

@Mapper(componentModel = "spring")
public interface AccountProfileMapper {

	AccountProfile requestToAccountProfile(ProfilePostRequest request);


	// Account 정보를 설정하기 위한 메서드
	@AfterMapping
	default void setAccount(@MappingTarget AccountProfile accountProfile, ProfilePostRequest request) {
		Account account = new Account();
		account.setId(request.getAccountId());
		accountProfile.setAccount(account);
	}
}
