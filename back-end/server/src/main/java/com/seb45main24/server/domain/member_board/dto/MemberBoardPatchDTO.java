package com.seb45main24.server.domain.member_board.dto;

import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MemberBoardPatchDTO {
    private long memberBoardId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private MemberBoard.Status status;

    @NotBlank
    private String position;

    private List<Long> techTagIdList;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    public void setMemberBoardId(long memberBoardId) {
        this.memberBoardId = memberBoardId;
    }
}
