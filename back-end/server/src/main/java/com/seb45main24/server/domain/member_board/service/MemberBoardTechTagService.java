package com.seb45main24.server.domain.member_board.service;

import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;
import com.seb45main24.server.domain.member_board.repository.MemberBoardTechTagRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberBoardTechTagService {
    private MemberBoardTechTagRepository repository;

    public MemberBoardTechTagService(MemberBoardTechTagRepository repository) {
        this.repository = repository;
    }

    public MemberBoardTechTag createTechTag(MemberBoardTechTag memberBoardTechTag) {
        MemberBoardTechTag createTechTag = repository.save(memberBoardTechTag);

        return createTechTag;
    }

    public MemberBoardTechTag updateTechTag(MemberBoardTechTag memberBoardTechTag) {
        MemberBoardTechTag findTechTag = findVerifiedTechTag(memberBoardTechTag.getMemberBoardTechTagId());

        Optional.ofNullable(memberBoardTechTag.getTechTag())
                .ifPresent(techTag -> findTechTag.setTechTag(techTag));

        MemberBoardTechTag saveTechTag = repository.save(findTechTag);

        return saveTechTag;
    }

    public void deleteTechTag(long techTagId) {
        MemberBoardTechTag findTechTag = findVerifiedTechTag(techTagId);
        repository.delete(findTechTag);
    }

    public List<MemberBoardTechTag> getTechTagByMemberBoardId(Long memberBoardId) {
        return repository.findByMemberBoardId(memberBoardId);
    }

    private MemberBoardTechTag findVerifiedTechTag(long techTagId) {
        Optional<MemberBoardTechTag> optionalTechTag = repository.findById(techTagId);

        MemberBoardTechTag findTechTag = optionalTechTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));

        return findTechTag;
    }
}
