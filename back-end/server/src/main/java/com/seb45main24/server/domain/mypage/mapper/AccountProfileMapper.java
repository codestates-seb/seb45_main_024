package com.seb45main24.server.domain.mypage.mapper;

import org.mapstruct.Mapper;

import com.seb45main24.server.domain.mypage.dto.AccountProfilePatchDto;
import com.seb45main24.server.domain.mypage.dto.AccountProfilePostDto;
import com.seb45main24.server.domain.mypage.dto.AccountProfileResponseDto;
import com.seb45main24.server.domain.mypage.entity.AccountProfile;

@Mapper(componentModel = "spring")
public interface AccountProfileMapper {

	AccountProfile postDtoToAccountProfile (AccountProfilePostDto postDto);

	AccountProfile patchDtoToAccountProfile (AccountProfilePatchDto patchDto);

	AccountProfileResponseDto accountProfileToResponseDto(AccountProfile accountProfile);
}
