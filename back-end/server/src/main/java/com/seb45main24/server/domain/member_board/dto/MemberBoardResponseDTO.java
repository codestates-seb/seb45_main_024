package com.seb45main24.server.domain.member_board.dto;

import com.seb45main24.server.global.auditing.Auditable;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Builder
@Getter
public class MemberBoardResponseDTO {
    private long memberBoardId;
    private String title;
    private String content;
    private String status;
    private Integer views;
    private String position;
    private String writerNickName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
