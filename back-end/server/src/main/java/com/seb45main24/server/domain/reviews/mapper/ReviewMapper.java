package com.seb45main24.server.domain.reviews.mapper;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.reviews.dto.ReviewPostDto;
import com.seb45main24.server.domain.reviews.dto.ReviewResponseDto;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews);
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        Review review = new Review();

        Account reviewer = new Account();
        reviewer.setId(reviewPostDto.getReviewerId());

        review.setTitle(reviewPostDto.getTitle());
        review.setProjectUrl(reviewPostDto.getProjectUrl());
        review.setIntro(reviewPostDto.getIntro());
        review.setContent(reviewPostDto.getContent());
        review.setCreatedAt(LocalDateTime.now());


        return review;
    }

    default ReviewResponseDto reviewToReviewResponseDto(Review review) {
        if (review == null) {
            return null;
        }

        ReviewResponseDto.ReviewResponseDtoBuilder reviewResponseDto = ReviewResponseDto.builder();

        if (review.getReviewId() != null) {
            reviewResponseDto.reviewId(review.getReviewId());
        }

        reviewResponseDto.title(review.getTitle());
        reviewResponseDto.projectUrl(review.getProjectUrl());
        reviewResponseDto.intro(review.getIntro());
        reviewResponseDto.content(review.getContent());

        reviewResponseDto.reviewerId(review.getReviewer().getId());
        reviewResponseDto.reviewerNickname(review.getReviewer().getNickname());
        reviewResponseDto.reviewerImageUrl(review.getReviewer().getImage().getImageUrl());

        reviewResponseDto.revieweeId(review.getReviewee().getId());
        reviewResponseDto.revieweeNickname(review.getReviewee().getNickname());
        reviewResponseDto.createdAt(review.getCreatedAt());


        return reviewResponseDto.build();
    }
}
