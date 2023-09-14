package com.seb45main24.server.domain.member_board.dto;

import com.seb45main24.server.domain.reply.entity.Reply;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberBoardReplyDTO {
    private long replyId;
    private long writerId;
    private String writerNickName;
    private String content;
    private boolean isApply;
    private Reply.AcceptType acceptType;
    private LocalDateTime createAt;
}
