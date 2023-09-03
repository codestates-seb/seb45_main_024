package com.seb45main24.server.domain.teamboard.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPatchDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPostDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardResponseDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TeamBoardMapper {
    List<TeamBoardResponseDto> teamBoardsToTeamBoardResponseDtos(List<TeamBoard> teamBoards);

    default TeamBoard teamBoardPostDtoToTeamBoard(TeamBoardPostDto teamBoardPostDto) {
        TeamBoard teamBoard = new TeamBoard();
        Account account = new Account();
        account.setId(teamBoardPostDto.getAccountId());

        teamBoard.setTitle(teamBoardPostDto.getTitle());
        teamBoard.setPosition(teamBoardPostDto.getPosition());
        teamBoard.setKeywords(teamBoardPostDto.getKeywords());
        teamBoard.setCreatedAt(LocalDateTime.now());
        teamBoard.setModifiedAt(LocalDateTime.now());
        teamBoard.setAccount(account);

        return teamBoard;

    }

    default TeamBoard teamBoardPatchDtoToTeamBoard(TeamBoardPatchDto teamBoardPatchDto) {
        if (teamBoardPatchDto == null) {
            return null;
        }

        TeamBoard teamBoard = new TeamBoard();

        teamBoard.setTeamBoardId(teamBoardPatchDto.getTeamBoardId());
        teamBoard.setTitle(teamBoardPatchDto.getTitle());
        teamBoard.setPosition(teamBoardPatchDto.getPosition());
        teamBoard.setKeywords(teamBoardPatchDto.getKeywords());
        teamBoard.setModifiedAt(LocalDateTime.now());

        return teamBoard;
    }

    default TeamBoardResponseDto teamBoardToTeamBoardResponseDto(TeamBoard teamBoard) {
        if (teamBoard == null) {
            return null;
        }

        TeamBoardResponseDto.TeamBoardResponseDtoBuilder teamBoardResponseDto = TeamBoardResponseDto.builder();

        if (teamBoard.getTeamBoardId() != null) {
            teamBoardResponseDto.teamBoardId(teamBoard.getTeamBoardId());
        }
        teamBoardResponseDto.title(teamBoard.getTitle());
        teamBoardResponseDto.position(teamBoard.getPosition());
        teamBoardResponseDto.keywords(teamBoard.getKeywords());
        teamBoardResponseDto.accountId(teamBoard.getAccount().getEmail());

        return teamBoardResponseDto.build();
    }
}
