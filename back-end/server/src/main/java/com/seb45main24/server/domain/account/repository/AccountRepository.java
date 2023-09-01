package com.seb45main24.server.domain.account.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

	Optional<Account> findByEmail(String email);
}
