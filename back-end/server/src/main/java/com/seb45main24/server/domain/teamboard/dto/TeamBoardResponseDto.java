package com.seb45main24.server.domain.teamboard.dto;

import com.seb45main24.server.global.auditing.Auditable;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class TeamBoardResponseDto extends Auditable {
    private Long teamBoardId;
    private String title;
    private String position;
    private List<String> keywords;
    private String accountId;
}
