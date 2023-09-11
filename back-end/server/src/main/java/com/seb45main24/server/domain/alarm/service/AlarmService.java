package com.seb45main24.server.domain.alarm.service;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.alarm.repository.AlarmRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlarmService {
    private final AlarmRepository repository;

    public AlarmService(AlarmRepository repository) {
        this.repository = repository;
    }

    public Alarm createAlarm(Alarm alarm) {
        Alarm saveAlarm = repository.save(alarm);

        return saveAlarm;
    }

    public Page<Alarm> findAlarmList() {
        return repository.findAll(PageRequest.of(0, 10, Sort.by("alarmId").descending()));
    }
}
