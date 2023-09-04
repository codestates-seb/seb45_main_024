package com.seb45main24.server.domain.teamboard.mapper;

import com.seb45main24.server.domain.teamboard.dto.TeamBoardResponseDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-04T16:39:19+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class TeamBoardMapperImpl implements TeamBoardMapper {

    @Override
    public List<TeamBoardResponseDto> teamBoardsToTeamBoardResponseDtos(List<TeamBoard> teamBoards) {
        if ( teamBoards == null ) {
            return null;
        }

        List<TeamBoardResponseDto> list = new ArrayList<TeamBoardResponseDto>( teamBoards.size() );
        for ( TeamBoard teamBoard : teamBoards ) {
            list.add( teamBoardToTeamBoardResponseDto( teamBoard ) );
        }

        return list;
    }
}
