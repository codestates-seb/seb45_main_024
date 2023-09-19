package com.seb45main24.server.domain.accountprofile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;

public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Long> {
	List<ProjectDetails> findByAccountProfileId(Long accountProfileId);


}
