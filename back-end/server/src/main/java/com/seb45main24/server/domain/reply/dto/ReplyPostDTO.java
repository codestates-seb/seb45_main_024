package com.seb45main24.server.domain.reply.dto;

import com.seb45main24.server.domain.reply.entity.Reply;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReplyPostDTO {
    @NotBlank
    private String content;

    private Boolean isApply;

    private Long memberBoardId;

    private Long loginAccountId;

    private Reply.AcceptType acceptType;

    public void setLoginAccountId(Long loginAccountId) {
        this.loginAccountId = loginAccountId;
    }

    public void setAcceptType(Reply.AcceptType acceptType) {
        this.acceptType = acceptType;
    }
}
