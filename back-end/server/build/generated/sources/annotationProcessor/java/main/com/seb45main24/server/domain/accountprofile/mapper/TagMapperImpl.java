package com.seb45main24.server.domain.accountprofile.mapper;

import com.seb45main24.server.domain.accountprofile.dto.TechTagDto;
import com.seb45main24.server.domain.accountprofile.entity.TechTag;
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
public class TagMapperImpl implements TagMapper {

    @Override
    public List<TechTagDto> techTagListToTechTagDtoList(List<TechTag> techTagList) {
        if ( techTagList == null ) {
            return null;
        }

        List<TechTagDto> list = new ArrayList<TechTagDto>( techTagList.size() );
        for ( TechTag techTag : techTagList ) {
            list.add( techTagToTechTagDto( techTag ) );
        }

        return list;
    }
}
