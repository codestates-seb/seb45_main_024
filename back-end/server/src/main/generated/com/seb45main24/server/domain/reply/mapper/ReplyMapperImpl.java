package com.seb45main24.server.domain.reply.mapper;

import com.seb45main24.server.domain.reply.dto.ReplyPatchDTO;
import com.seb45main24.server.domain.reply.dto.ReplyPostDTO;
import com.seb45main24.server.domain.reply.dto.ReplyResponseDTO;
import com.seb45main24.server.domain.reply.dto.ReplyResponseDTO.ReplyResponseDTOBuilder;
import com.seb45main24.server.domain.reply.entity.Reply;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-06T17:29:43+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class ReplyMapperImpl implements ReplyMapper {

    @Override
    public Reply replyPostDtoToReply(ReplyPostDTO replyPostDTO) {
        if ( replyPostDTO == null ) {
            return null;
        }

        Reply reply = new Reply();

        reply.setContent( replyPostDTO.getContent() );

        return reply;
    }

    @Override
    public Reply replyPatchDtoToReply(ReplyPatchDTO replyPatchDTO) {
        if ( replyPatchDTO == null ) {
            return null;
        }

        Reply reply = new Reply();

        reply.setReplyId( replyPatchDTO.getReplyId() );
        reply.setContent( replyPatchDTO.getContent() );

        return reply;
    }

    @Override
    public ReplyResponseDTO replyToReplyResponseDto(Reply reply) {
        if ( reply == null ) {
            return null;
        }

        ReplyResponseDTOBuilder replyResponseDTO = ReplyResponseDTO.builder();

        if ( reply.getReplyId() != null ) {
            replyResponseDTO.replyId( reply.getReplyId() );
        }
        replyResponseDTO.content( reply.getContent() );
        replyResponseDTO.createdAt( reply.getCreatedAt() );
        replyResponseDTO.modifiedAt( reply.getModifiedAt() );

        return replyResponseDTO.build();
    }
}
