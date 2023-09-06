package com.seb45main24.server.domain.mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.mypage.entity.MypageImage;

public interface MypageImageRepository extends JpaRepository<MypageImage, Long> {
}
