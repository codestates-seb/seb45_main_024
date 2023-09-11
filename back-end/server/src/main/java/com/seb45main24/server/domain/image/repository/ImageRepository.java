package com.seb45main24.server.domain.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.image.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
