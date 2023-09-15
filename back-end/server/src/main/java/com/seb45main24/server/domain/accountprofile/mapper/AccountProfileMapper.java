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

}
