package com.seb45main24.server.domain.teamboard.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPatchDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPostDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardResponseDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.entity.TeamBoardTechTag;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TeamBoardMapper {

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

    default TeamBoardResponseDto teamBoardToTeamBoardResponseDto(TeamBoard teamBoard,
                                                                 List<TeamBoardTechTag> techTagList) {
        if (teamBoard == null) {
            return null;
        }

        TeamBoardResponseDto.TeamBoardResponseDtoBuilder
                teamBoardResponseDto = TeamBoardResponseDto.builder();

        List<String> tagNameList = techTagList.stream().map(
                techTag -> {
                    String id = techTag.getTechTag().getId().toString();
                    String name = techTag.getTechTag().getTechName();

                    return id + ":" + name;
                }
        ).collect(Collectors.toList());

        if (teamBoard.getTeamBoardId() != null) {
            teamBoardResponseDto.teamBoardId(teamBoard.getTeamBoardId());
        }
        teamBoardResponseDto.title(teamBoard.getTitle());
        teamBoardResponseDto.position(teamBoard.getPosition());
        teamBoardResponseDto.keywords(teamBoard.getKeywords());
        teamBoardResponseDto.accountId(teamBoard.getAccount().getId());
        teamBoardResponseDto.nickname(teamBoard.getAccount().getNickname());
        teamBoardResponseDto.teamBoardImageUrl(teamBoard.getAccount().getImage().getImageUrl());
        teamBoardResponseDto.techTagList(tagNameList);
        teamBoardResponseDto.createdAt(teamBoard.getCreatedAt() );
        teamBoardResponseDto.modifiedAt(teamBoard.getModifiedAt() );

        return teamBoardResponseDto.build();
    }

    default List<TeamBoardResponseDto> teamBoardsToTeamBoardResponseDtoList(List<TeamBoard> teamBoardList,
                                                                            List<List<TeamBoardTechTag>> techTagLists) {
        if (teamBoardList == null) {
            return null;
        }

        List<TeamBoardResponseDto> list = new ArrayList<TeamBoardResponseDto>(teamBoardList.size());
        for (int i = 0; i < teamBoardList.size(); i++) {
            TeamBoard teamBoard = teamBoardList.get(i);
            List<TeamBoardTechTag> techTagList = techTagLists.get(i);
            list.add(teamBoardToTeamBoardResponseDto(teamBoard, techTagList));
        }

        return list;
    }
}
