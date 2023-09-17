package com.seb45main24.server.domain.member_board.dto;

import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.reply.dto.ReplyResponseDTO;
import com.seb45main24.server.domain.reply.entity.Reply;
import com.seb45main24.server.global.auditing.Auditable;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class MemberBoardResponseDTO {
    private Long memberBoardId;
    private String title;
    private String content;
    private MemberBoard.Status status;
    private Integer views;
    private String position;
    private Long writerId;
    private String writerNickName;
    private String writerImageURL;
    private List<MemberBoardReplyDTO> replyList;
    private List<String> techTagList;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
