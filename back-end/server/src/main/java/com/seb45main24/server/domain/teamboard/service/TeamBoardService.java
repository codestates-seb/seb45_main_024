package com.seb45main24.server.domain.teamboard.service;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardRepository;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.AccessDeniedException;
import java.util.Optional;

@Service
@Transactional
public class TeamBoardService {

    private final TeamBoardRepository teamBoardRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public TeamBoardService(TeamBoardRepository teamBoardRepository,
                            AccountService accountService,
                            AccountRepository accountRepository) {
        this.teamBoardRepository = teamBoardRepository;
        this.accountService = accountService;
        this.accountRepository = accountRepository;

    }

    // 게시글 등록
    public TeamBoard createTeamBoard(TeamBoard teamBoard) {
        accountRepository.findById(teamBoard.getAccount().getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        return teamBoardRepository.save(teamBoard);
    }

    // 게시글 수정
    public TeamBoard updateTeamBoard(TeamBoard teamBoard,
                                     @LoginAccountId long accountId) {
        TeamBoard findTeamBoard = findVerifiedTeamBoard(teamBoard.getTeamBoardId());

        if (!findTeamBoard.getAccount().getId().equals(accountId)) {
            throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);
        }

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

    // 게시글 삭제
    public void deleteTeamBoard(long teamBoardId,
                                @LoginAccountId long accountId) {
        TeamBoard findTeamBoard = findVerifiedTeamBoard(teamBoardId);

        if (!findTeamBoard.getAccount().getId().equals(accountId)) {
            throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);
        }

        teamBoardRepository.delete(findTeamBoard);
    }


    private TeamBoard findVerifiedTeamBoard(long teamBoardId) {
        Optional<TeamBoard> optionalTeamBoard = teamBoardRepository.findById(teamBoardId);

        return optionalTeamBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

}
