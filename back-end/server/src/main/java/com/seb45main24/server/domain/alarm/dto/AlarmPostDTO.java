package com.seb45main24.server.domain.alarm.dto;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class AlarmPostDTO {
    private Alarm.AlarmType alarmType;

    private Long loginAccountId;

    private Boolean isChecked;

    @Positive
    private long targetId;

    @Positive
    private long memberId;

    public void setLoginAccountId(Long loginAccountId) {
        this.loginAccountId = loginAccountId;
    }
}
