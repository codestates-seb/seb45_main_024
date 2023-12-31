package com.seb45main24.server.domain.alarm.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.alarm.dto.AlarmPatchDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmPostDTO;
import com.seb45main24.server.domain.alarm.dto.AlarmResponseDTO;
import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.reply.dto.ReplyAcceptDTO;
import com.seb45main24.server.domain.reply.dto.ReplyPostDTO;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface AlarmMapper {
    List<AlarmResponseDTO> alarmListToAlarmResponseDtoList(List<Alarm> alarmList);

    default Alarm replyAcceptDtoToAlarm(ReplyAcceptDTO replyAcceptDTO) {
        if ( replyAcceptDTO == null ) {
            return null;
        }

        Alarm alarm = new Alarm();

        Account writer = new Account();
        writer.setId(replyAcceptDTO.getAccountId());
        System.out.println("account: " + replyAcceptDTO.getAccountId());

        Account target = new Account();
        target.setId(replyAcceptDTO.getWriterId());
        System.out.println("target: " + replyAcceptDTO.getWriterId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(replyAcceptDTO.getMemberBoardId());

        alarm.setAlarmType( replyAcceptDTO.getAlarmType() );
        alarm.setIsChecked( false );
        alarm.setWriter( writer );
        alarm.setTarget( target );
        alarm.setMemberBoard( memberBoard );
        alarm.setCreatedAt(LocalDateTime.now());
        alarm.setModifiedAt(LocalDateTime.now());

        return alarm;
    }

    default Alarm patchAlramCheck(long alramId) {
        Alarm alarm = new Alarm();
        alarm.setAlarmId(alramId);
        alarm.setIsChecked(true);

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
        alarmResponseDTO.isChecked(alarm.getIsChecked());
        alarmResponseDTO.writerNickname(alarm.getWriter().getNickname());
        alarmResponseDTO.writerId(alarm.getWriter().getId());
        alarmResponseDTO.title(alarm.getMemberBoard().getTitle());
        alarmResponseDTO.memberBoardId(alarm.getMemberBoard().getMemberBoardId());

        return alarmResponseDTO.build();
    }
}
