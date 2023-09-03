package com.seb45main24.server.domain.teamboard.service;

import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class TeamBoardService {

    private final TeamBoardRepository teamBoardRepository;

    public TeamBoardService(TeamBoardRepository teamBoardRepository) {
        this.teamBoardRepository = teamBoardRepository;
    }

    // 게시글 등록
    public TeamBoard createTeamBoard(TeamBoard teamBoard) {
        TeamBoard saveTeamBoard = teamBoardRepository.save(teamBoard);

        return saveTeamBoard;
    }

    // 게시글 수정
    public TeamBoard updateTeamBoard(TeamBoard teamBoard) {
        TeamBoard findTeamBoard = findVerifiedTeamBoard(teamBoard.getTeamBoardId());

        Optional.ofNullable(teamBoard.getTitle())
                .ifPresent(title -> findTeamBoard.setTitle(title));
        Optional.ofNullable(teamBoard.getPosition())
                .ifPresent(position -> findTeamBoard.setPosition(position));
        Optional.ofNullable(teamBoard.getKeywords())
                .ifPresent(keywords -> findTeamBoard.setKeywords(keywords));
        Optional.ofNullable(teamBoard.getModifiedAt())
                .ifPresent(modifiedAt -> findTeamBoard.setModifiedAt(modifiedAt));

        TeamBoard saveTeamBoard = teamBoardRepository.save(findTeamBoard);

        return saveTeamBoard;

    }

    // 게시글 하나 조회
    public TeamBoard findTeamBoard(long teamBoardId) {
        return findVerifiedTeamBoard(teamBoardId);
    }

    // 게시글 여러개 조회
    public Page<TeamBoard> findTeamBoards(int page) {
        return teamBoardRepository.findAll(PageRequest.of(page, 10, Sort.by("teamBoardId").descending()));

    }

    // 게시글 삭제
    public void deleteTeamBoard(long teamBoardId) {
        TeamBoard teamBoard = findVerifiedTeamBoard(teamBoardId);
        teamBoardRepository.delete(teamBoard);
    }


    private TeamBoard findVerifiedTeamBoard(long teambBoardId) {
        Optional<TeamBoard> optionalTeamBoard = teamBoardRepository.findById(teambBoardId);

        TeamBoard findTeamBoard = optionalTeamBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));

        return findTeamBoard;
    }

}
