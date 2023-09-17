package com.seb45main24.server.domain.accountprofile.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProjectDetailResponse {
	private Long accountProfileId;
	private Long accountId;
	private String projectTitle;
	private String projectUrl;
	private String imageUrl;
}
