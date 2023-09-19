package com.seb45main24.server.domain.reviews.mapper;

import com.seb45main24.server.domain.reviews.dto.ReviewResponseDto;
import com.seb45main24.server.domain.reviews.entity.Review;
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
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews) {
        if ( reviews == null ) {
            return null;
        }

        List<ReviewResponseDto> list = new ArrayList<ReviewResponseDto>( reviews.size() );
        for ( Review review : reviews ) {
            list.add( reviewToReviewResponseDto( review ) );
        }

        return list;
    }
}
