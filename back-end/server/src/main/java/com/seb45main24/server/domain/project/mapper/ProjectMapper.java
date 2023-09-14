package com.seb45main24.server.domain.project.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.project.dto.ProjectPatchDTO;
import com.seb45main24.server.domain.project.dto.ProjectPostDTO;
import com.seb45main24.server.domain.project.entity.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project projectPatchDtoToProject(ProjectPatchDTO projectPatchDTO);

    default Project projectPostDtoToProject(ProjectPostDTO projectPostDTO) {
        if ( projectPostDTO == null ) {
            return null;
        }

        Project project = new Project();

        Account account = new Account();
        account.setId(projectPostDTO.getAccountId());

        MemberBoard memberBoard = new MemberBoard();
        memberBoard.setMemberBoardId(projectPostDTO.getMemberBoardId());

        project.setAccount(account);
        project.setMemberBoard(memberBoard);

        return project;
    }
}
