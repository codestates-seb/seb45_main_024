package com.seb45main24.server.domain.alarm.mapper;

import com.seb45main24.server.domain.alarm.dto.AlarmPatchDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmPostDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmResponseDTO;
import com.seb45main24.server.domain.alarm.entity.Alarm;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlarmMapper {
    Alarm alarmPostDtoToAlarm(AlarmPostDTO alarmPostDTO);
    Alarm alarmPatchDtoToAlarm(AlarmPatchDTO alarmPatchDTO);
    List<AlarmResponseDTO> alarmListToAlarmResponseDtoList(List<Alarm> alarmList);

    default AlarmResponseDTO alarmToAlarmResponseDto(Alarm alarm) {
        if ( alarm == null ) {
            return null;
        }

        AlarmResponseDTO.AlarmResponseDTOBuilder alarmResponseDTO = AlarmResponseDTO.builder();

        if ( alarm.getAlarmId() != null ) {
            alarmResponseDTO.alarmId( alarm.getAlarmId() );
        }

        alarmResponseDTO.alarmType(alarm.getAlarmType());

        return alarmResponseDTO.build();
    }
}
