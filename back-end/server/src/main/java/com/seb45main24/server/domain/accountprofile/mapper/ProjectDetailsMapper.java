package com.seb45main24.server.domain.accountprofile.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;

@Mapper(componentModel = "spring")
public interface ProjectDetailsMapper {
	ProjectDetailsMapper INSTANCE = Mappers.getMapper(ProjectDetailsMapper.class);

	ProjectDetailResponse toProjectDetailResponse(ProjectDetails projectDetails);

}
