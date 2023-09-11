package com.seb45main24.server.domain.reply.mapper;


import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.reply.dto.ReplyPatchDTO;
import com.seb45main24.server.domain.reply.dto.ReplyPostDTO;
import com.seb45main24.server.domain.reply.dto.ReplyResponseDTO;
import com.seb45main24.server.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    Reply replyPatchDtoToReply(ReplyPatchDTO replyPatchDTO);

    default Reply replyPostDtoToReply(ReplyPostDTO replyPostDTO) {
        if ( replyPostDTO == null ) {
            return null;
        }

        Reply reply = new Reply();

        Account writer = new Account();
        writer.setId(replyPostDTO.getLoginAccountId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(replyPostDTO.getMemberBoardId());

        reply.setContent( replyPostDTO.getContent() );
        reply.setIsApply( replyPostDTO.getIsApply() );
        reply.setWriter( writer );
        reply.setMemberBoard( memberBoard );

        return reply;
    }

    default ReplyResponseDTO replyToReplyResponseDto(Reply reply) {
        if ( reply == null ) {
            return null;
        }

        ReplyResponseDTO.ReplyResponseDTOBuilder replyResponseDTO = ReplyResponseDTO.builder();

        if ( reply.getReplyId() != null ) {
            replyResponseDTO.replyId( reply.getReplyId() );
        }
        replyResponseDTO.content( reply.getContent() );
        replyResponseDTO.isApply( reply.getIsApply() );
        replyResponseDTO.writerNickName( reply.getWriter().getNickname() );
        replyResponseDTO.createdAt( reply.getCreatedAt() );
        replyResponseDTO.modifiedAt( reply.getModifiedAt() );

        return replyResponseDTO.build();
    }
}
