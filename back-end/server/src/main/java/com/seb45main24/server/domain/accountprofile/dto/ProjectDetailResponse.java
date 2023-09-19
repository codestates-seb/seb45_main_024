package com.seb45main24.server.domain.accountprofile.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDetailResponse {
	private Long projectDetailId;
	private Long accountProfileId;
	private String projectTitle;
	private String projectUrl;
	private String imageUrl;
}
