package com.seb45main24.server.domain.reply.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReplyResponseDTO {
    private long replyId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
