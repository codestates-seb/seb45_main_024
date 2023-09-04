package com.seb45main24.server.domain.member_board.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
public class MemberBoardPatchDTO {
    private long memberBoardId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String status;

    @NotBlank
    private String position;

    @NotBlank
    private LocalDateTime startDate;

    @NotBlank
    private LocalDateTime endDate;

    public void setMemberBoardId(long memberBoardId) {
        this.memberBoardId = memberBoardId;
    }
}
