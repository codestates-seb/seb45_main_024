package com.seb45main24.server.domain.alarm.controller;

import com.seb45main24.server.domain.alarm.dto.AlarmPostDTO;
import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.alarm.mapper.AlarmMapper;
import com.seb45main24.server.domain.alarm.repository.AlarmRepository;
import com.seb45main24.server.domain.alarm.service.AlarmService;
import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/alarms")
public class AlarmController {
    private final AlarmRepository repository;
    private final AlarmMapper mapper;
    private final AlarmService service;

    public AlarmController(AlarmRepository repository,
                           AlarmMapper mapper,
                           AlarmService service) {
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postAlarm(@Valid @RequestBody AlarmPostDTO alarmPostDTO,
                                    @LoginAccountId Long loginAccountId) {
        alarmPostDTO.setLoginAccountId(loginAccountId);

        Alarm alarm = mapper.alarmPostDtoToAlarm(alarmPostDTO);

        Alarm createAlarm = service.createAlarm(alarm);

        URI location = UriComponentsBuilder.newInstance()
                .path("/alarms" + "/{createAlarm.getAlarmId()}")
                .buildAndExpand(createAlarm.getAlarmId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity checkAllAlarm(@LoginAccountId Long loginAccountId) {
        List<Alarm> alarmList = service.findAlarmByIsChecked(loginAccountId);

        alarmList.stream().forEach(alarm -> {
            Alarm updateAlarm = mapper.patchAlramCheck(alarm.getAlarmId());
            service.updateAlarm(updateAlarm);
        });

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{alarm-id}")
    public ResponseEntity checkAlarm(@PathVariable("alarm-id") @Positive long alarmId) {
        Alarm alarm = mapper.patchAlramCheck(alarmId);
        service.updateAlarm(alarm);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAlarmList(@LoginAccountId Long loginAccountId) {
        List<Alarm> test = repository.findByTargetId(loginAccountId);

        return new ResponseEntity<>(mapper.alarmListToAlarmResponseDtoList(test), HttpStatus.OK);
    }

    @GetMapping("/{alarm-id}")
    public ResponseEntity getAlarm(@PathVariable("alarm-id") @Positive long alarmId ) {
        Alarm alarm = service.findAlarm(alarmId);

        return new ResponseEntity<>(mapper.alarmToAlarmResponseDto(alarm), HttpStatus.OK);
    }
}
