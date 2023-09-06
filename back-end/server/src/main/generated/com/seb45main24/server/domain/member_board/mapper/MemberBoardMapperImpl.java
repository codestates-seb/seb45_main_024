package com.seb45main24.server.domain.member_board.mapper;

import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-06T10:11:07+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberBoardMapperImpl implements MemberBoardMapper {

    @Override
    public List<MemberBoardResponseDTO> memberBoardListToMemberBoardResponseDtoList(List<MemberBoard> memberBoardList) {
        if ( memberBoardList == null ) {
            return null;
        }

        List<MemberBoardResponseDTO> list = new ArrayList<MemberBoardResponseDTO>( memberBoardList.size() );
        for ( MemberBoard memberBoard : memberBoardList ) {
            list.add( memberBoardToMemberBoardResponseDto( memberBoard ) );
        }

        return list;
    }
}
