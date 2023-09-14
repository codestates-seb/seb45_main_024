package com.seb45main24.server.domain.project.controller;

import com.seb45main24.server.domain.project.dto.ProjectPostDTO;
import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.project.mapper.ProjectMapper;
import com.seb45main24.server.domain.project.repository.ProjectRepository;
import com.seb45main24.server.domain.project.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private ProjectRepository repository;
    private ProjectMapper mapper;
    private ProjectService service;

    public ProjectController(ProjectRepository repository,
                             ProjectMapper mapper,
                             ProjectService service) {
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postProject(@Valid @RequestBody ProjectPostDTO projectPostDTO) {
        Project project = mapper.projectPostDtoToProject(projectPostDTO);

        Project createProject = service.createProject(project);

        URI location = UriComponentsBuilder.newInstance()
                .path("/projects" + "/{createProject.getProjectId()}")
                .buildAndExpand(createProject.getProjectId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{project-id}")
    public ResponseEntity deleteProject(@PathVariable("project-id") @Positive long projectId) {
        service.deleteProject(projectId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
