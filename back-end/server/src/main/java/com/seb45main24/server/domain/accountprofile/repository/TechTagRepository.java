package com.seb45main24.server.domain.accountprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;

public interface TechTagRepository extends JpaRepository<TechTag, Long> {
}
