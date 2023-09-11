package com.seb45main24.server.domain.alarm.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Alarm {
    public enum AlarmType {
        ACCEPT,
        REPLY
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    @Enumerated(EnumType.STRING)
    private AlarmType alarmType;
}
