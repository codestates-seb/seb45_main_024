package com.seb45main24.server.domain.member_board.repository;

import java.util.List;

import com.seb45main24.server.domain.member_board.entity.MemberBoard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberBoardRepository extends JpaRepository<MemberBoard, Long> {

	@Query("SELECT m FROM MemberBoard m WHERE m.writer.id= :accountId")
	List<MemberBoard> findMemberBoardsByWriter(Long accountId);

	Page<MemberBoard> findByTitleContaining(String keyword, PageRequest pageable);

	Page<MemberBoard> findByPositionContaining(String keyword, PageRequest pageable);
}
