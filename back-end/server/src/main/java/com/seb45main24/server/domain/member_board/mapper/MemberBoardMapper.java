package com.seb45main24.server.domain.member_board.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPatchDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPostDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardReplyDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;
import com.seb45main24.server.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberBoardMapper {
    default MemberBoard memberBoardPostDtoToMember(MemberBoardPostDTO memberBoardPostDTO) {
        MemberBoard memberBoard = new MemberBoard();
        Account writer = new Account();
        writer.setId(memberBoardPostDTO.getLoginAccountId());

        memberBoard.setTitle( memberBoardPostDTO.getTitle() );
        memberBoard.setContent( memberBoardPostDTO.getContent() );
        memberBoard.setStatus(memberBoardPostDTO.getStatus());
        memberBoard.setPosition(memberBoardPostDTO.getPosition());
        memberBoard.setStartDate(memberBoardPostDTO.getStartDate());
        memberBoard.setEndDate(memberBoardPostDTO.getEndDate());
        memberBoard.setCreatedAt(LocalDateTime.now());
        memberBoard.setModifiedAt(LocalDateTime.now());
        memberBoard.setWriter(writer);

        return memberBoard;
    }

    default MemberBoard memberBoardPatchDtoToMember(MemberBoardPatchDTO memberBoardPatchDTO) {
        if ( memberBoardPatchDTO == null ) {
            return null;
        }

        MemberBoard memberBoard = new MemberBoard();

        memberBoard.setMemberBoardId(memberBoardPatchDTO.getMemberBoardId());
        memberBoard.setTitle( memberBoardPatchDTO.getTitle() );
        memberBoard.setContent( memberBoardPatchDTO.getContent() );
        memberBoard.setStatus(memberBoardPatchDTO.getStatus());
        memberBoard.setPosition(memberBoardPatchDTO.getPosition());
        memberBoard.setStartDate(memberBoardPatchDTO.getStartDate());
        memberBoard.setEndDate(memberBoardPatchDTO.getEndDate());
        memberBoard.setModifiedAt(LocalDateTime.now());

        return memberBoard;
    }

    default MemberBoardResponseDTO memberBoardToMemberBoardResponseDto(MemberBoard memberBoard,
                                                                       List<MemberBoardTechTag> techTagList) {
        if ( memberBoard == null ) {
            return null;
        }

        MemberBoardResponseDTO.MemberBoardResponseDTOBuilder memberBoardResponseDTO = MemberBoardResponseDTO.builder();

        List<MemberBoardReplyDTO> memberBoardReplyDTOList = memberBoard.getReplyList()
                .stream()
                .map(reply -> {
                    MemberBoardReplyDTO memberBoardReplyDTO = new MemberBoardReplyDTO();

                    memberBoardReplyDTO.setReplyId(reply.getReplyId());
                    memberBoardReplyDTO.setWriterId(reply.getWriter().getId());
                    memberBoardReplyDTO.setWriterNickName(reply.getWriter().getNickname());
                    memberBoardReplyDTO.setContent(reply.getContent());
                    memberBoardReplyDTO.setApply(reply.getIsApply());
                    memberBoardReplyDTO.setAcceptType(reply.getAcceptType());
                    memberBoardReplyDTO.setCreateAt(reply.getCreatedAt());

                    return memberBoardReplyDTO;
                }).collect(Collectors.toList());

        List<String> tagNameList = techTagList.stream().map(
                techTag -> {
                    String id = techTag.getTechTag().getId().toString();
                    String name = techTag.getTechTag().getTechName();

                    return id + ":" +name;
                }
        ).collect(Collectors.toList());

        if ( memberBoard.getMemberBoardId() != null ) {
            memberBoardResponseDTO.memberBoardId( memberBoard.getMemberBoardId() );
        }
        memberBoardResponseDTO.title( memberBoard.getTitle() );
        memberBoardResponseDTO.content( memberBoard.getContent() );
        memberBoardResponseDTO.status( memberBoard.getStatus() );
        memberBoardResponseDTO.views( memberBoard.getViews() );
        memberBoardResponseDTO.position( memberBoard.getPosition() );
        memberBoardResponseDTO.writerId( memberBoard.getWriter().getId() );
        memberBoardResponseDTO.writerNickName( memberBoard.getWriter().getNickname() );
        memberBoardResponseDTO.replyList( memberBoardReplyDTOList );
        memberBoardResponseDTO.techTagList( tagNameList );
        memberBoardResponseDTO.startDate( memberBoard.getStartDate() );
        memberBoardResponseDTO.endDate( memberBoard.getEndDate() );
        memberBoardResponseDTO.createdAt( memberBoard.getCreatedAt() );
        memberBoardResponseDTO.modifiedAt( memberBoard.getModifiedAt() );

        return memberBoardResponseDTO.build();
    }

    default List<MemberBoardResponseDTO> memberBoardListToMemberBoardResponseDtoList(List<MemberBoard> memberBoardList,
                                                                                     List<List<MemberBoardTechTag>> doubleTechTagList) {
        if ( memberBoardList == null ) {
            return null;
        }

        List<MemberBoardResponseDTO> list = new ArrayList<MemberBoardResponseDTO>( memberBoardList.size() );
        for(int i =0; i < memberBoardList.size(); i++) {
            MemberBoard memberBoard = memberBoardList.get(i);
            List<MemberBoardTechTag> techTagList = doubleTechTagList.get(i);
            list.add( memberBoardToMemberBoardResponseDto( memberBoard, techTagList ) );
        }

        return list;
    }
}
