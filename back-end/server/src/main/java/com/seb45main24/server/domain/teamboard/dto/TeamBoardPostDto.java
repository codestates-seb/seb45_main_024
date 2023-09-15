package com.seb45main24.server.domain.teamboard.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
public class TeamBoardPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String position;

    @Nullable
    private List<String> keywords;

    private List<Long> techTagIdList;

    @Positive
    private Long accountId;

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

}

