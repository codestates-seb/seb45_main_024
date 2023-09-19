package com.seb45main24.server.domain.reply.dto;

import com.seb45main24.server.domain.reply.entity.Reply;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReplyPatchDTO {
    private long replyId;

    @NotBlank
    private String content;

    public void setReplyId(long replyId) {
        this.replyId = replyId;
    }
}
