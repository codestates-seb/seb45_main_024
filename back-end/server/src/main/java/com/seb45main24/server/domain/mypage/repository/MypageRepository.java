package com.seb45main24.server.domain.mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb45main24.server.domain.mypage.entity.Mypage;

public interface MypageRepository extends JpaRepository<Mypage, Long> {
}
