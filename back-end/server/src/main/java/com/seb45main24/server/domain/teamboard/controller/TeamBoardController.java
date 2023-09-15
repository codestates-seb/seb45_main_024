package com.seb45main24.server.domain.teamboard.controller;


import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPatchDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPostDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.entity.TeamBoardTechTag;
import com.seb45main24.server.domain.teamboard.mapper.TeamBoardMapper;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardRepository;
import com.seb45main24.server.domain.teamboard.service.TeamBoardService;
import com.seb45main24.server.domain.teamboard.service.TeamBoardTechTagService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/teamboards")
public class TeamBoardController {

    private final TeamBoardService teamBoardService;
    private final TeamBoardRepository teamBoardRepository;
    private final TeamBoardMapper mapper;
    private final TeamBoardTechTagService techTagService;

    public TeamBoardController(TeamBoardService teamBoardService,
                               TeamBoardRepository teamBoardRepository,
                               TeamBoardMapper mapper,
                               TeamBoardTechTagService techTagService) {
        this.teamBoardService = teamBoardService;
        this.teamBoardRepository = teamBoardRepository;
        this.mapper = mapper;
        this.techTagService = techTagService;
    }

    // 팀찾기 게시글 작성
    @PostMapping
    public ResponseEntity postTeamBoard(@LoginAccountId Long accountId,
                                        @Valid @RequestBody TeamBoardPostDto teamBoardPostDto) {
        teamBoardPostDto.setAccountId(accountId);
        TeamBoard teamBoard = teamBoardService.createTeamBoard(
                mapper.teamBoardPostDtoToTeamBoard(teamBoardPostDto));
//
//        TeamBoard createTeamBoard = teamBoardService.createTeamBoard(teamBoard);

        teamBoardPostDto.getTechTagIdList().stream()
                .forEach(i -> {
                    TeamBoardTechTag teamBoardTechTag = new TeamBoardTechTag();

                    TechTag techTag = new TechTag();
                    techTag.setId(i);

                    TeamBoard team = new TeamBoard();
                    team.setTeamBoardId(teamBoard.getTeamBoardId());

                    teamBoardTechTag.setTechTag(techTag);
                    teamBoardTechTag.setTeamBoard(team);
                    techTagService.createTechTag(teamBoardTechTag);
                });

        URI location = UriCreator.createUri("/teamboards", teamBoard.getTeamBoardId());

        return ResponseEntity.created(location).build();

    }

    // 팀찾기 게시글 수정
    @PatchMapping("/{teamBoardId}")
    public ResponseEntity patchTeamBoard(@LoginAccountId Long accountId,
                                         @PathVariable("teamBoardId") @Positive long teamBoardId,
                                         @Valid @RequestBody TeamBoardPatchDto teamBoardPatchDto) {

        teamBoardPatchDto.setTeamBoardId(teamBoardId);

        Long authorId = teamBoardService.findTeamBoard(teamBoardId).getAccount().getId();

        if (!accountId.equals(authorId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        TeamBoard teamBoard = teamBoardService.updateTeamBoard(
                mapper.teamBoardPatchDtoToTeamBoard(teamBoardPatchDto));

        List<TeamBoardTechTag> techTagList = techTagService.getTechTagByTeamBoardId(teamBoardId);

        techTagList.stream().forEach(list -> {
            techTagService.deleteTechTag(list.getTeamBoardTechTagId());
        });

        teamBoardPatchDto.getTechTagIdList().stream()
                .forEach(i -> {
                    TeamBoardTechTag teamBoardTechTag = new TeamBoardTechTag();

                    TechTag techTag = new TechTag();
                    techTag.setId(i);

                    TeamBoard team = new TeamBoard();
                    team.setTeamBoardId(teamBoard.getTeamBoardId());

                    teamBoardTechTag.setTechTag(techTag);
                    teamBoardTechTag.setTeamBoard(team);
                    techTagService.createTechTag(teamBoardTechTag);
                });

        List<TeamBoardTechTag> updateTechTagList = techTagService.getTechTagByTeamBoardId(teamBoardId);

        return new ResponseEntity<>(mapper.teamBoardToTeamBoardResponseDto(teamBoard, updateTechTagList), HttpStatus.OK);
    }


    // 팀찾기 게시글 1개 조회
    @GetMapping("/{teamBoardId}")
    public ResponseEntity getTeamBoard(@PathVariable("teamBoardId") @Positive long teamBoardId) {
        TeamBoard teamBoard = teamBoardService.findTeamBoard(teamBoardId);

        List<TeamBoardTechTag> techTagList = techTagService.getTechTagByTeamBoardId(teamBoardId);

        return new ResponseEntity<>(mapper.teamBoardToTeamBoardResponseDto(teamBoard, techTagList), HttpStatus.OK);
    }

    // 팀찾기 게시글 리스트 조회
    @GetMapping
    public ResponseEntity getTeamBoards(@Positive @RequestParam int page,
                                        @RequestParam(required = false) String keyword) {
        Page<TeamBoard> pageTeamBoards = teamBoardService.findTeamBoards(page - 1);
        List<TeamBoard> teamBoards = pageTeamBoards.getContent();

        List<List<TeamBoardTechTag>> techTagLists = new ArrayList<>();
        teamBoards.stream().forEach(teamBoard ->
                techTagLists.add(techTagService.getTechTagByTeamBoardId(teamBoard.getTeamBoardId())));

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.teamBoardsToTeamBoardResponseDtoList(teamBoards, techTagLists), pageTeamBoards), HttpStatus.OK);

    }

    // 팀찾기 게시글 검색
    @GetMapping("/search")
    public ResponseEntity searchTeamBoards(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String position,
            @Positive @RequestParam int page) {
        Page<TeamBoard> teamBoardList = teamBoardService.searchTeamBoards(title, position, page - 1);
        List<TeamBoard> teamBoards = teamBoardList.getContent();

        List<List<TeamBoardTechTag>> techTagLists = new ArrayList<>();
        teamBoards.stream().forEach(teamBoard ->
                techTagLists.add(techTagService.getTechTagByTeamBoardId(teamBoard.getTeamBoardId())));


        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.teamBoardsToTeamBoardResponseDtoList(
                        teamBoards, techTagLists),
                teamBoardList), HttpStatus.OK);
    }


    // 팀찾기 게시글 삭제
    @DeleteMapping("/{teamBoardId}")
    public ResponseEntity deleteTeamBoard(@LoginAccountId Long accountId,
                                          @PathVariable("teamBoardId") @Positive long teamBoardId) {
        TeamBoard teamBoard = teamBoardService.findTeamBoard(teamBoardId);

        Long authorId = teamBoard.getAccount().getId();

        if (!accountId.equals(authorId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        teamBoardService.deleteTeamBoard(teamBoardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
