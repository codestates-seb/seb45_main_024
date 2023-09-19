package com.seb45main24.server.domain.accountprofile.dto;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;

import lombok.Getter;

@Getter
public class TechTagDto {
	private Long id;
	private String techName;
	private TechTag.TagType tagType;

	public TechTagDto(Long id, String techName, TechTag.TagType tagType) {
		this.id = id;
		this.techName = techName;
		this.tagType = tagType;
	}
}
