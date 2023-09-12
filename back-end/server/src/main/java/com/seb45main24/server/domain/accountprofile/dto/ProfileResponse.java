package com.seb45main24.server.domain.accountprofile.dto;

import java.util.List;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.accountprofile.entity.TechTag;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProfileResponse {
	private String imageUrl;
	private String email;
	private String nickname;
	private String coverLetter;
	private List<String> softSkills;
	private List<String> hardSkills;
	private List<ProjectDetailResponse> projectDetails;

	@Builder
	public ProfileResponse(String imageUrl, String email, String nickname, String coverLetter, List<String> softSkills,
		List<String> hardSkills, List<ProjectDetailResponse> projectDetails) {
		this.imageUrl = imageUrl;
		this.email = email;
		this.nickname = nickname;
		this.coverLetter = coverLetter;
		this.softSkills = softSkills;
		this.hardSkills = hardSkills;
		this.projectDetails = projectDetails;
	}
}
