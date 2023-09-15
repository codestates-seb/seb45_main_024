package com.seb45main24.server.domain.teamboard.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class TeamBoardResponseDto {
    private Long teamBoardId;
    private String title;
    private String position;
    private String nickname;
    private List<String> keywords;
    private List<String> techTagList;
    private Long accountId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
