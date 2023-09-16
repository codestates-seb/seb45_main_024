package com.seb45main24.server.domain.member_board.service;

import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.member_board.repository.MemberBoardRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberBoardService {
    private final MemberBoardRepository repository;

    public MemberBoardService(MemberBoardRepository repository) {
        this.repository = repository;
    }

    public MemberBoard createMemberBoard(MemberBoard memberBoard) {
        MemberBoard saveMemberBoard = repository.save(memberBoard);

        return saveMemberBoard;
    }

    public MemberBoard updateMemberBoard(MemberBoard memberBoard) {
        MemberBoard findMemberBoard = findVerifiedMemberBoard(memberBoard.getMemberBoardId());

        Optional.ofNullable(memberBoard.getTitle())
                .ifPresent(title -> findMemberBoard.setTitle(title));
        Optional.ofNullable(memberBoard.getContent())
                .ifPresent(content -> findMemberBoard.setContent(content));
        Optional.ofNullable(memberBoard.getStatus())
                .ifPresent(status -> findMemberBoard.setStatus(status));
        Optional.ofNullable(memberBoard.getStartDate())
                .ifPresent(startDate -> findMemberBoard.setStartDate(startDate));
        Optional.ofNullable(memberBoard.getEndDate())
                .ifPresent(endDate -> findMemberBoard.setEndDate(endDate));

        MemberBoard saveMemberBoard = repository.save(findMemberBoard);

        return saveMemberBoard;
    }

    public void addView(MemberBoard memberBoard) {
        MemberBoard findMemberBoard = findVerifiedMemberBoard(memberBoard.getMemberBoardId());

        Optional.ofNullable(memberBoard.getViews())
                .ifPresent(view -> findMemberBoard.setViews(++view));

        repository.save(findMemberBoard);
    }

    public MemberBoard findMemberBoard(long memberBoardId) {
        return findVerifiedMemberBoard(memberBoardId);
    }

    public Page<MemberBoard> findMemberBoardList(int page) {
        return repository.findAll(PageRequest.of(page, 10, Sort.by("memberBoardId").descending()));
    }

    public Page<MemberBoard> findMemberBoardListByView(int page) {
        return repository.findAll(PageRequest.of(page, 10, Sort.by("views").descending()
                .and(Sort.by("memberBoardId").descending())));
    }

    public void deleteMemberBoard(int memberBoardId) {
        MemberBoard memberBoard = findMemberBoard(memberBoardId);

        repository.delete(memberBoard);
    }

    private MemberBoard findVerifiedMemberBoard(long memberBoardId) {
        Optional<MemberBoard> optionalMemberBoard = repository.findById(memberBoardId);

        MemberBoard findMemberBoard = optionalMemberBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));

        return findMemberBoard;
    }

    // 내가 쓴 팀원찾기 게시글 조회
    public List<MemberBoard> getMemberBoards(Long accountId) {
        return repository.findMemberBoardsByWriter(accountId);
    }

    public Page<MemberBoard> getMemberBoardListByTitle(String keyword, int page){
        return repository.findByTitleContaining(keyword,
                PageRequest.of(page, 10, Sort.by("memberBoardId").descending()));
    }

    public Page<MemberBoard> getMemberBoardListByPosition(String position, int page){
        return repository.findByPositionContaining(position,
                PageRequest.of(page, 10, Sort.by("memberBoardId").descending()));
    }
}
