package com.seb45main24.server.domain.image.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UploadImage {

	private Long accountId;
	private String originName;
	private String saveName;
	private Long size;
	private String imageUrl;
	private String imageClsf;
	private LocalDateTime createdAt;

	@Builder
	public UploadImage(Long accountId, String originName, String saveName, Long size, String imageUrl, LocalDateTime createdAt) {
		this.accountId = accountId;
		this.originName = originName;
		this.saveName = saveName;
		this.size = size;
		this.imageUrl = imageUrl;
		this.createdAt = createdAt;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public void setImageClsf(String imageClsf) {
		this.imageClsf = imageClsf;
	}
}
