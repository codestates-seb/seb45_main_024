package com.seb45main24.server.domain.image.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UploadImage {

	private Long accountId;
	private String imageName;
	private String imageUrl;
	private String imageType;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;

	@Builder
	public UploadImage(Long accountId, String imageName, String imageUrl, String imageType, LocalDateTime createdAt,
		LocalDateTime modifiedAt) {
		this.accountId = accountId;
		this.imageName = imageName;
		this.imageUrl = imageUrl;
		this.imageType = imageType;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
}
