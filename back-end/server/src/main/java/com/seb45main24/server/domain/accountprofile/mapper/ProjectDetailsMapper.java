package com.seb45main24.server.domain.accountprofile.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;

@Mapper(componentModel = "spring")
public interface ProjectDetailsMapper {
	ProjectDetailsMapper INSTANCE = Mappers.getMapper(ProjectDetailsMapper.class);

	ProjectDetails toProjectDetail(ProjectDetailRequest request);

	List<ProjectDetailResponse> toProjectDetailResponses(List<ProjectDetails> projectDetailsList);

	default ProjectDetailResponse toProjectDetailResponse(ProjectDetails projectDetails) {
		ProjectDetailResponse projectDetailResponse = new ProjectDetailResponse();

		if(projectDetails.getImage() != null) {
			projectDetailResponse.setProjectDetailId(projectDetails.getId());
			projectDetailResponse.setProjectTitle(projectDetails.getProjectTitle());
			projectDetailResponse.setProjectUrl(projectDetails.getProjectUrl());
			projectDetailResponse.setImageUrl(projectDetails.getImage().getImageUrl());
			projectDetailResponse.setAccountProfileId(projectDetails.getAccountProfile().getId());
		} else {
			projectDetailResponse.setProjectDetailId(projectDetails.getId());
			projectDetailResponse.setProjectTitle(projectDetails.getProjectTitle());
			projectDetailResponse.setProjectUrl(projectDetails.getProjectUrl());
			projectDetailResponse.setAccountProfileId(projectDetails.getAccountProfile().getId());
		}

		return projectDetailResponse;

	}

}
