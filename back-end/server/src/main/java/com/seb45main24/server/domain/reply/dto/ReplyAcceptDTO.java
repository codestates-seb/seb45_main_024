package com.seb45main24.server.domain.reply.dto;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.reply.entity.Reply;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyAcceptDTO {
    private long accountId;
    private long replyId;
    private long memberBoardId;
    private long writerId;
    private Reply.AcceptType acceptType;
    private Alarm.AlarmType alarmType;
}
