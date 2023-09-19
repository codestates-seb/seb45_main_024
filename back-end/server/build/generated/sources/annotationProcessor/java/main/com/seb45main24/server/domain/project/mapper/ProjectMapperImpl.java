package com.seb45main24.server.domain.project.mapper;

import com.seb45main24.server.domain.project.dto.ProjectPatchDTO;
import com.seb45main24.server.domain.project.entity.Project;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project projectPatchDtoToProject(ProjectPatchDTO projectPatchDTO) {
        if ( projectPatchDTO == null ) {
            return null;
        }

        Project project = new Project();

        return project;
    }
}
