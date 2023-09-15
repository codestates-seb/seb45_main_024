package com.seb45main24.server.domain.accountprofile.dto;

import lombok.Getter;

@Getter
public class TechTagDto {
	private Long id;
	private String techName;

	public TechTagDto(Long id, String techName) {
		this.id = id;
		this.techName = techName;
	}
}
