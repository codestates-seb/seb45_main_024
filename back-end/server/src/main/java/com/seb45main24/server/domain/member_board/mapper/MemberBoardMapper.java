package com.seb45main24.server.domain.member_board.mapper;

import com.seb45main24.server.domain.member_board.dto.MemberBoardPatchDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPostDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberBoardMapper {
    MemberBoardResponseDTO memberBoardToMemberBoardResponseDto(MemberBoard memberBoard);
    List<MemberBoardResponseDTO> memberBoardListToMemberBoardResponseDtoList(List<MemberBoard> memberBoardList);

    default MemberBoard memberBoardPostDtoToMember(MemberBoardPostDTO memberBoardPostDTO) {
        MemberBoard memberBoard = new MemberBoard();

        memberBoard.setTitle( memberBoardPostDTO.getTitle() );
        memberBoard.setContent( memberBoardPostDTO.getContent() );
        memberBoard.setStatus(memberBoardPostDTO.getStatus());
        memberBoard.setPosition(memberBoardPostDTO.getPosition());
        memberBoard.setStartDate(memberBoardPostDTO.getStartDate());
        memberBoard.setEndDate(memberBoardPostDTO.getEndDate());
        memberBoard.setCreatedAt(LocalDateTime.now());
        memberBoard.setModifiedAt(LocalDateTime.now());

        return memberBoard;
    }

    default MemberBoard memberBoardPatchDtoToMember(MemberBoardPatchDTO memberBoardPatchDTO) {
        if ( memberBoardPatchDTO == null ) {
            return null;
        }

        MemberBoard memberBoard = new MemberBoard();

        memberBoard.setTitle( memberBoardPatchDTO.getTitle() );
        memberBoard.setContent( memberBoardPatchDTO.getContent() );
        memberBoard.setStatus(memberBoardPatchDTO.getStatus());
        memberBoard.setPosition(memberBoardPatchDTO.getPosition());
        memberBoard.setStartDate(memberBoardPatchDTO.getStartDate());
        memberBoard.setEndDate(memberBoardPatchDTO.getEndDate());
        memberBoard.setModifiedAt(LocalDateTime.now());

        return memberBoard;
    }
}
