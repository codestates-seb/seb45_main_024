package com.seb45main24.server.domain.image.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UploadImage {

	private Long id;
	private String originName;
	private String saveName;
	private Long size;
	private String urlPath;
	private String imageClsf;

	@Builder
	public UploadImage(Long id, String originName, String saveName, Long size, String urlPath) {
		this.id = id;
		this.originName = originName;
		this.saveName = saveName;
		this.size = size;
		this.urlPath = urlPath;
	}

	public void setImageClsf(String imageClsf) {
		this.imageClsf = imageClsf;
	}
}
