package com.seb45main24.server.domain.accountprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.SoftSkillTag;

public interface SoftSkillRepository extends JpaRepository<SoftSkillTag, Long> {

	List<SoftSkillTag> findByAccountProfileId(Long accountProfileId);
}
