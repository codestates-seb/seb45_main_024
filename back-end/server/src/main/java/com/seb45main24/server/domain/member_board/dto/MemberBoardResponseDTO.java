package com.seb45main24.server.domain.member_board.dto;

import com.seb45main24.server.global.auditing.Auditable;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class MemberBoardResponseDTO extends Auditable {
    private long memberBoardId;
    private String title;
    private String content;
    private String status;
    private Integer views;
    private String position;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
