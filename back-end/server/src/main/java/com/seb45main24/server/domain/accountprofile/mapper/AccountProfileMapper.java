package com.seb45main24.server.domain.accountprofile.mapper;

import org.mapstruct.Mapper;

import com.seb45main24.server.domain.accountprofile.dto.AccountProfilePatchDto;
import com.seb45main24.server.domain.accountprofile.dto.AccountProfilePostDto;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.dto.AccountProfileResponseDto;

@Mapper(componentModel = "spring")
public interface AccountProfileMapper {

	AccountProfile postDtoToAccountProfile (AccountProfilePostDto postDto);

	AccountProfile patchDtoToAccountProfile (AccountProfilePatchDto patchDto);

	AccountProfileResponseDto accountProfileToResponseDto(AccountProfile accountProfile);
}
