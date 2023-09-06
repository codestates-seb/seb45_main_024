package com.seb45main24.server.domain.reply.mapper;


import com.seb45main24.server.domain.reply.dto.ReplyPatchDTO;
import com.seb45main24.server.domain.reply.dto.ReplyPostDTO;
import com.seb45main24.server.domain.reply.dto.ReplyResponseDTO;
import com.seb45main24.server.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    Reply replyPostDtoToReply(ReplyPostDTO replyPostDTO);
    Reply replyPatchDtoToReply(ReplyPatchDTO replyPatchDTO);
    ReplyResponseDTO replyToReplyResponseDto(Reply reply);
}
