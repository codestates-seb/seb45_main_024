package com.seb45main24.server.domain.accountprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.ProfileTechTag;

public interface ProfileTechTagRepository extends JpaRepository<ProfileTechTag, Long> {

	List<ProfileTechTag> findByAccountProfileId(Long accountProfileId);
}
