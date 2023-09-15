package com.seb45main24.server.domain.accountprofile.dto;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import lombok.Getter;

@Getter
public class TechTagDto {
	private Long id;
	private String name;
	private TechTag.TagType tagType;

	public TechTagDto(Long id, String name, TechTag.TagType tagType) {
		this.id = id;
		this.name = name;
		this.tagType = tagType;
	}
}
