package com.seb45main24.server.domain.teamboard.controller;


import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPatchDto;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardPostDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.mapper.TeamBoardMapper;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardRepository;
import com.seb45main24.server.domain.teamboard.service.TeamBoardService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;

import com.seb45main24.server.global.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/teamboards")
public class TeamBoardController {

    private final TeamBoardService teamBoardService;
    private final TeamBoardRepository teamBoardRepository;
    private final TeamBoardMapper mapper;

    public TeamBoardController(TeamBoardService teamBoardService,
                               TeamBoardRepository teamBoardRepository,
                               TeamBoardMapper mapper) {
        this.teamBoardService = teamBoardService;
        this.teamBoardRepository = teamBoardRepository;
        this.mapper = mapper;
    }

    // 팀찾기 게시글 작성
    @PostMapping
    public ResponseEntity postTeamBoard(@LoginAccountId Long accountId,
                                        @Valid @RequestBody TeamBoardPostDto teamBoardDto) {
        teamBoardDto.setAccountId(accountId);
        TeamBoard teamBoard = teamBoardService.createTeamBoard(
                mapper.teamBoardPostDtoToTeamBoard(teamBoardDto));

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

        TeamBoard teamBoard = teamBoardService.updateTeamBoard(mapper.teamBoardPatchDtoToTeamBoard(teamBoardPatchDto));

        return new ResponseEntity<>(mapper.teamBoardToTeamBoardResponseDto(teamBoard), HttpStatus.OK);
    }


    // 팀찾기 게시글 1개 조회
    @GetMapping("/{teamBoardId}")
    public ResponseEntity getTeamBoard(@PathVariable("teamBoardId") @Positive long teamBoardId) {
        TeamBoard teamBoard = teamBoardService.findTeamBoard(teamBoardId);

        return new ResponseEntity<>(mapper.teamBoardToTeamBoardResponseDto(teamBoard), HttpStatus.OK);
    }

    // 팀찾기 게시글 리스트 조회
    @GetMapping
    public ResponseEntity getTeamBoards(@Positive @RequestParam int page,
                                        @RequestParam(required = false) String keyword) {
        Page<TeamBoard> pageTeamBoards = teamBoardService.findTeamBoards(page - 1);
        List<TeamBoard> teamBoards = pageTeamBoards.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.teamBoardsToTeamBoardResponseDtos(teamBoards), pageTeamBoards), HttpStatus.OK);

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
