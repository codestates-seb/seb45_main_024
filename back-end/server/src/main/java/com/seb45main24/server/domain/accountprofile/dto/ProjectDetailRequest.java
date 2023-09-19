package com.seb45main24.server.domain.accountprofile.dto;

import com.seb45main24.server.domain.image.dto.ImageRequest;
import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDetailRequest {
	private String projectTitle;
	private String projectUrl;
	private ImageRequest uploadImage;
}
