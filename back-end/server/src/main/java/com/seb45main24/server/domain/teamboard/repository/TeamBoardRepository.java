package com.seb45main24.server.domain.teamboard.repository;

import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamBoardRepository extends JpaRepository<TeamBoard, Long> {

}