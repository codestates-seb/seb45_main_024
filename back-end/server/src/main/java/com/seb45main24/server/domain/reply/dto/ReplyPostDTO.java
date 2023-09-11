package com.seb45main24.server.domain.reply.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReplyPostDTO {
    @NotBlank
    private String content;

    private Boolean isApply;

    private Long memberBoardId;

    private Long loginAccountId;

    public void setLoginAccountId(Long loginAccountId) {
        this.loginAccountId = loginAccountId;
    }
}
