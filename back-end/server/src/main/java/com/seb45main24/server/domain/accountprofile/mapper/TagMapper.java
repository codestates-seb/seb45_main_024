package com.seb45main24.server.domain.accountprofile.mapper;

import com.seb45main24.server.domain.accountprofile.dto.TechTagDto;
import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    List<TechTagDto> techTagListToTechTagDtoList(List<TechTag> techTagList);

    default TechTagDto techTagToTechTagDto(TechTag techTag){
        if ( techTag == null ) {
            return null;
        }

        Long id = null;
        id = techTag.getId();

        String name = new String();
        name = techTag.getTechName();

        TechTag.TagType tagType = null;
        tagType = techTag.getTagType();

        TechTagDto techTagDto = new TechTagDto( id, name, tagType );

        return techTagDto;
    }
}
