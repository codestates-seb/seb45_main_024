package com.seb45main24.server.domain.account.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seb45main24.server.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

	Optional<Account> findByEmail(String email);
	Optional<Account> findByNickname(String nickname);
	@Query("SELECT a.nickname FROM Account a WHERE a.id = :accountId")
	String findNicknameByAccountId(@Param("accountId") Long accountId);
}
