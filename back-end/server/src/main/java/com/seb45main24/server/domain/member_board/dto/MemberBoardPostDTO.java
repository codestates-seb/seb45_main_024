package com.seb45main24.server.domain.member_board.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MemberBoardPostDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String status;

    @NotBlank
    private String position;

    private List<Long> techTagIdList;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Positive
    private Long loginAccountId;

    public void setLoginAccountId(Long loginAccountId) {
        this.loginAccountId = loginAccountId;
    }
}
