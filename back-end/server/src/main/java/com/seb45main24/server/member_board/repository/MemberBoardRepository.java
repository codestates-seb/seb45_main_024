package com.seb45main24.server.member_board.repository;

import com.seb45main24.server.member_board.entity.MemberBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberBoardRepository extends JpaRepository<MemberBoard, Long> {
}
