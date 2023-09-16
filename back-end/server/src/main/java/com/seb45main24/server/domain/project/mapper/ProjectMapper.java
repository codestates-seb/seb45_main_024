package com.seb45main24.server.domain.project.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.alarm.dto.AlarmPostDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPostDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.project.dto.ProjectPatchDTO;
import com.seb45main24.server.domain.project.dto.ProjectPostDTO;
import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.reply.dto.ReplyAcceptDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project projectPatchDtoToProject(ProjectPatchDTO projectPatchDTO);

    default Project memberPostDtoToProject(MemberBoardPostDTO memberBoardPostDTO) {
        if ( memberBoardPostDTO == null ) {
            return null;
        }

        Project project = new Project();

        Account account = new Account();
        account.setId(memberBoardPostDTO.getLoginAccountId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(memberBoardPostDTO.getMemberBoardId());

        project.setAccount(account);
        project.setMemberBoard(memberBoard);

        return project;
    }

    default Project replyAcceptDtoToProject(ReplyAcceptDTO replyAcceptDTO) {
        if ( replyAcceptDTO == null ) {
            return null;
        }

        Project project = new Project();

        Account account = new Account();
        account.setId(replyAcceptDTO.getWriterId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(replyAcceptDTO.getMemberBoardId());

        project.setAccount(account);
        project.setMemberBoard(memberBoard);

        return project;
    }
}
