package com.seb45main24.server.domain.accountprofile.mapper;

import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProjectDetailResponse;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class ProjectDetailsMapperImpl implements ProjectDetailsMapper {

    @Override
    public ProjectDetails toProjectDetail(ProjectDetailRequest request) {
        if ( request == null ) {
            return null;
        }

        ProjectDetails projectDetails = new ProjectDetails();

        projectDetails.setProjectTitle( request.getProjectTitle() );
        projectDetails.setProjectUrl( request.getProjectUrl() );

        return projectDetails;
    }

    @Override
    public List<ProjectDetailResponse> toProjectDetailResponses(List<ProjectDetails> projectDetailsList) {
        if ( projectDetailsList == null ) {
            return null;
        }

        List<ProjectDetailResponse> list = new ArrayList<ProjectDetailResponse>( projectDetailsList.size() );
        for ( ProjectDetails projectDetails : projectDetailsList ) {
            list.add( toProjectDetailResponse( projectDetails ) );
        }

        return list;
    }
}
