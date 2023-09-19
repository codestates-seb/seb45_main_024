package com.seb45main24.server.domain.accountprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;

public interface TechTagRepository extends JpaRepository<TechTag, Long> {

	// @Query("SELECT m FROM MemberBoardTechTag m WHERE m.memberBoard.id = :memberBoardId")
	// List<MemberBoardTechTag> findByMemberBoardId(@Param("memberBoardId") Long memberBoardId);
}
