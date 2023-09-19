package com.seb45main24.server.domain.teamboard.repository;

import java.util.List;

import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamBoardRepository extends JpaRepository<TeamBoard, Long> {
	List<TeamBoard> findTeamBoardsByAccountId(Long accountId);

	@Query("SELECT tb FROM TeamBoard tb WHERE tb.title LIKE %:title% AND tb.position LIKE %:position%")
	Page<TeamBoard> findByTitleContainingAndPositionContaining(@Param("title") String title,
															   @Param("position") String position,
															   Pageable pageable);
}
