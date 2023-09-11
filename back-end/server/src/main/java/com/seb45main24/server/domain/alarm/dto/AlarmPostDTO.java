package com.seb45main24.server.domain.alarm.dto;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import lombok.Getter;

@Getter
public class AlarmPostDTO {
    private Alarm.AlarmType alarmType;
}
