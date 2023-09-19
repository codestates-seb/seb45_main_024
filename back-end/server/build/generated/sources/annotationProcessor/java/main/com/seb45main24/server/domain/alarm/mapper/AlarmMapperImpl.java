package com.seb45main24.server.domain.alarm.mapper;

import com.seb45main24.server.domain.alarm.dto.AlarmResponseDTO;
import com.seb45main24.server.domain.alarm.entity.Alarm;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class AlarmMapperImpl implements AlarmMapper {

    @Override
    public List<AlarmResponseDTO> alarmListToAlarmResponseDtoList(List<Alarm> alarmList) {
        if ( alarmList == null ) {
            return null;
        }

        List<AlarmResponseDTO> list = new ArrayList<AlarmResponseDTO>( alarmList.size() );
        for ( Alarm alarm : alarmList ) {
            list.add( alarmToAlarmResponseDto( alarm ) );
        }

        return list;
    }
}
