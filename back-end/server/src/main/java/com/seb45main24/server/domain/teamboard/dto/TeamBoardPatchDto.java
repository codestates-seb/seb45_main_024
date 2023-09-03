package com.seb45main24.server.domain.teamboard.dto;

import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class TeamBoardPatchDto {
    private Long teamBoardId;

    @NotBlank
    private String title;

    @NotBlank
    private String position;

    @Nullable
    private List<String> keywords;

    public void setTeamBoardId(Long teamBoardId) {
        this.teamBoardId = teamBoardId;

    }

}
