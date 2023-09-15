package com.seb45main24.server.domain.member_board.repository;

import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberBoardTechTagRepository extends JpaRepository<MemberBoardTechTag, Long> {
    @Query("SELECT m FROM MemberBoardTechTag m WHERE m.memberBoard.id = :memberBoardId")
    List<MemberBoardTechTag> findByMemberBoardId(@Param("memberBoardId") Long memberBoardId);
}
