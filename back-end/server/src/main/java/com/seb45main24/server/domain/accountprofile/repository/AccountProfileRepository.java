package com.seb45main24.server.domain.accountprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;

public interface AccountProfileRepository extends JpaRepository<AccountProfile, Long> {
}
