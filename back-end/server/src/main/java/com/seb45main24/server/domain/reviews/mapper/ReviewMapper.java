package com.seb45main24.server.domain.reviews.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.reviews.dto.ReviewPostDto;
import com.seb45main24.server.domain.reviews.entity.Review;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        Review review = new Review();
        Account account = new Account();
        account.setId(reviewPostDto.getAccountId());

        review.setTitle(reviewPostDto.getTitle());
        review.setProject_url(reviewPostDto.getProject_url());
        review.setIntro(reviewPostDto.getIntro());
        review.setContent(reviewPostDto.getContent());
        review.setCreatedAt(LocalDateTime.now());
        review.setAccount(account);

        return review;
    }

}
