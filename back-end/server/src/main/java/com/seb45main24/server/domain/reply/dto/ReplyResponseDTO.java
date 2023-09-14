package com.seb45main24.server.domain.reply.dto;

import com.seb45main24.server.domain.reply.entity.Reply;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReplyResponseDTO {
    private long replyId;
    private String content;
    private Boolean isApply;
    private String writerNickName;
    private Reply.AcceptType acceptType;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
