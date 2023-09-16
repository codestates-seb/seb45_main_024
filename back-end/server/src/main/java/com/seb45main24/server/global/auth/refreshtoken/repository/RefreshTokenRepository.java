package com.seb45main24.server.global.auth.refreshtoken.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.global.auth.refreshtoken.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByRefreshToken(String refreshToken);

	boolean existsByKeyEmail(String userEmail);
	void deleteByKeyEmail(String userEmail);

}
