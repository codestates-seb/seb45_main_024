package com.seb45main24.server.domain.alarm.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.alarm.dto.AlarmPatchDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmPostDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmResponseDTO;
import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlarmMapper {
    Alarm alarmPatchDtoToAlarm(AlarmPatchDTO alarmPatchDTO);
    List<AlarmResponseDTO> alarmListToAlarmResponseDtoList(List<Alarm> alarmList);

    default Alarm alarmPostDtoToAlarm(AlarmPostDTO alarmPostDTO) {
        if ( alarmPostDTO == null ) {
            return null;
        }

        Alarm alarm = new Alarm();

        Account writer = new Account();
        writer.setId(alarmPostDTO.getLoginAccountId());

        Account target = new Account();
        target.setId(alarmPostDTO.getTargetId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(alarmPostDTO.getMemberId());

        alarm.setAlarmType( alarmPostDTO.getAlarmType() );
        alarm.setWriter( writer );
        alarm.setTarget( target );
        alarm.setMemberBoard( memberBoard );

        return alarm;
    }

    default AlarmResponseDTO alarmToAlarmResponseDto(Alarm alarm) {
        if ( alarm == null ) {
            return null;
        }

        AlarmResponseDTO.AlarmResponseDTOBuilder alarmResponseDTO = AlarmResponseDTO.builder();

        if ( alarm.getAlarmId() != null ) {
            alarmResponseDTO.alarmId( alarm.getAlarmId() );
        }

        alarmResponseDTO.alarmType(alarm.getAlarmType());
        alarmResponseDTO.writerNickname(alarm.getWriter().getNickname());
        alarmResponseDTO.writerId(alarm.getWriter().getId());
        alarmResponseDTO.title(alarm.getMemberBoard().getTitle());
        alarmResponseDTO.memberBoardId(alarm.getMemberBoard().getMemberBoardId());

        return alarmResponseDTO.build();
    }
}
