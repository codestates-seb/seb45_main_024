package com.seb45main24.server.domain.teamboard.service;

import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
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

        return teamBoardRepository.save(teamBoard);
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

        return teamBoardRepository.save(findTeamBoard);

    }

    // 게시글 하나 조회
    public TeamBoard findTeamBoard(long teamBoardId) {
        return findVerifiedTeamBoard(teamBoardId);
    }

    // 게시글 여러개 조회
    public Page<TeamBoard> findTeamBoards(int page) {
        return teamBoardRepository.findAll(PageRequest.of(page, 10, Sort.by("teamBoardId").descending()));

    }

    // 게시글 검색
    public Page<TeamBoard> searchTeamBoards(String title, String position, int page) {
        return teamBoardRepository.findByTitleContainingAndPositionContaining(title, position, PageRequest.of(page, 10, Sort.by("createdAt").descending()));
    }

    // 게시글 삭제
    public void deleteTeamBoard(long teamBoardId) {
        TeamBoard findTeamBoard = findVerifiedTeamBoard(teamBoardId);

        teamBoardRepository.delete(findTeamBoard);
    }


    private TeamBoard findVerifiedTeamBoard(long teamBoardId) {
        Optional<TeamBoard> optionalTeamBoard = teamBoardRepository.findById(teamBoardId);

        return optionalTeamBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

    // 내가 쓴 팀찾기 게시글 조회
    public List<TeamBoard> getTeamBoards(Long accountId) {
        return teamBoardRepository.findTeamBoardsByAccountId(accountId);
    }

}
