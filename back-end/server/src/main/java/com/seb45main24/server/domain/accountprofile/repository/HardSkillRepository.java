package com.seb45main24.server.domain.accountprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.HardSkillTag;

public interface HardSkillRepository extends JpaRepository<HardSkillTag, Long> {

	List<HardSkillTag> findByAccountProfileId(Long accountProfileId);
}
