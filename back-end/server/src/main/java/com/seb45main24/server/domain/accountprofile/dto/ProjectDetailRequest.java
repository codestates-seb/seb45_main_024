package com.seb45main24.server.domain.accountprofile.dto;

import com.seb45main24.server.domain.image.dto.UploadImage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDetailRequest {
	private String projectTitle;
	private String projectUrl;
	private String imageUrl;
}
