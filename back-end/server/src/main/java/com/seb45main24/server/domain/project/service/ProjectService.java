package com.seb45main24.server.domain.project.service;

import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.project.repository.ProjectRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {
    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public Project createProject(Project project) {
        Project saveProject = repository.save(project);

        return saveProject;
    }

    public void deleteProject(long projectId) {
        Project project = findVerifiedProejct(projectId);

        repository.delete(project);
    }

    public List<Project> getProjectByAccountId(Long accountId) {
        return repository.findByAccountId(accountId);
    }

    public List<Project> getProjectByMemberBoardId(Long memberBoardId) {
        return repository.findByMemberBoardId(memberBoardId);
    }

    private Project findVerifiedProejct(long projectId) {
        Optional<Project> optionalProject = repository.findById(projectId);

        Project findProject = optionalProject.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));

        return findProject;
    }
}
