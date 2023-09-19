package com.seb45main24.server.domain.teamboard.dto;

import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class TeamBoardPatchDto {
    private Long teamBoardId;
    private String title;
    private String position;
    private List<String> keywords;
    private List<Long> techTagIdList;

    public void setTeamBoardId(Long teamBoardId) {
        this.teamBoardId = teamBoardId;

    }

}
