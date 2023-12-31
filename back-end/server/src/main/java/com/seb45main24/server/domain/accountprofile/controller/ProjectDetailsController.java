package com.seb45main24.server.domain.accountprofile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.domain.accountprofile.mapper.ProjectDetailsMapper;
import com.seb45main24.server.domain.accountprofile.service.ProjectDetailService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypages/profile")
public class ProjectDetailsController {

	private final ProjectDetailService projectDetailService;
	private final ProjectDetailsMapper projectDetailsMapper;

	@PostMapping("/projectDetails")
	public ResponseEntity postProjectDetails(@LoginAccountId Long loginAccountId,
												@RequestPart(required = false) MultipartFile multipartFile,
												ProjectDetailRequest request) {

		ProjectDetails projectDetails = projectDetailsMapper.toProjectDetail(request);

		if(multipartFile != null) {

			ProjectDetails content = projectDetailService.createProjectDetails(loginAccountId, projectDetails, multipartFile);
			ProjectDetailResponse response = projectDetailsMapper.toProjectDetailResponse(content);
			return new ResponseEntity(response, HttpStatus.OK);

		} else {
			ProjectDetails content = projectDetailService.createProfileDetailsWithoutImage(loginAccountId, projectDetails);
			ProjectDetailResponse response = projectDetailsMapper.toProjectDetailResponse(content);
			return new ResponseEntity(response, HttpStatus.OK);
		}
	}


	@DeleteMapping("/projectDetails/{project-detail-id}")
	public ResponseEntity deleteProjectDetails(@LoginAccountId Long loginAccountId, @PathVariable("project-detail-id") Long projectDetailId) {

		projectDetailService.deleteProjectDetail(projectDetailId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
