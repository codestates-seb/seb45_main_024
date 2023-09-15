package com.seb45main24.server.domain.accountprofile.dto;

import java.util.List;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfilePostRequest {
	private Long accountId;
	private String coverLetter;
	private List<Long> techTags;
	private List<String> softSkills;
	private List<String> hardSkills;
	private List<ProjectDetailRequest> projectDetails;

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

}
