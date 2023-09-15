package com.seb45main24.server.domain.teamboard.repository;

import com.seb45main24.server.domain.teamboard.entity.TeamBoardTechTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamBoardTechTagRepository extends JpaRepository<TeamBoardTechTag, Long> {
    @Query(value = "SELECT * FROM team_board_tech_tag WHERE team_board_id = :teamBoardId", nativeQuery = true)
    List<TeamBoardTechTag> findByTeamBoardId(@Param("teamBoardId") Long teamBoardId);
}
