package com.seb45main24.server.domain.accountprofile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.service.ProjectDetailService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypages/profile")
public class ProjectDetailsController {

	private final ProjectDetailService projectDetailService;

	@PostMapping("/projectDetails")
	public ResponseEntity postProjectDetails(@LoginAccountId Long loginAccountId, @RequestBody ProjectDetailRequest request) {

		ProjectDetails content = projectDetailService.createProjectDetails(loginAccountId, request);

		ProjectDetailResponse response = ProjectDetailResponse.builder()
			.projectDetailId(content.getId())
			.accountId(loginAccountId)
			.projectUrl(content.getProjectUrl())
			.projectTitle(content.getProjectTitle())
			.imageUrl(content.getImage().getImageUrl())
			.accountProfileId(content.getAccountProfile().getId())
			.build();

		return new ResponseEntity(response, HttpStatus.OK);
	}


	@DeleteMapping("/projectDetails/{project-detail-id}")
	public ResponseEntity deleteProjectDetails(@LoginAccountId Long loginAccountId, @PathVariable("project-detail-id") Long projectDetailId) {

		projectDetailService.deleteProjectDetail(projectDetailId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
