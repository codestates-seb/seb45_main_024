package com.seb45main24.server.domain.teamboard.service;

import com.seb45main24.server.domain.teamboard.entity.TeamBoardTechTag;
import com.seb45main24.server.domain.teamboard.repository.TeamBoardTechTagRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeamBoardTechTagService {
    private TeamBoardTechTagRepository teamBoardTechTagRepository;

    public TeamBoardTechTagService(TeamBoardTechTagRepository teamBoardTechTagRepository) {
        this.teamBoardTechTagRepository = teamBoardTechTagRepository;
    }

    public TeamBoardTechTag createTechTag(TeamBoardTechTag teamBoardTechTag) {
        return teamBoardTechTagRepository.save(teamBoardTechTag);
    }

    public TeamBoardTechTag updateTechTag(TeamBoardTechTag teamBoardTechTag) {
        TeamBoardTechTag findTechTag = findVerifiedTechTag(teamBoardTechTag.getTeamBoardTechTagId());

        Optional.ofNullable(teamBoardTechTag.getTechTag())
                .ifPresent(techTag -> findTechTag.setTechTag(techTag));

        return teamBoardTechTagRepository.save(findTechTag);
    }

    public void deleteTechTag(Long techTagId) {
        TeamBoardTechTag findTechTag = findVerifiedTechTag(techTagId);
        teamBoardTechTagRepository.delete(findTechTag);

    }

    public List<TeamBoardTechTag> getTechTagByTeamBoardId(Long teamBoardId) {
        return teamBoardTechTagRepository.findByTeamBoardId(teamBoardId);
    }

    private TeamBoardTechTag findVerifiedTechTag(Long techTagId) {
        Optional<TeamBoardTechTag> optionalTechTag = teamBoardTechTagRepository.findById(techTagId);

        return optionalTechTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }


}
