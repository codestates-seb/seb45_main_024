package com.seb45main24.server.domain.reviews.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReviewResponseDto {
    private Long reviewId;
    private String title;
    private String projectUrl;
    private String intro;
    private String content;

    private Long reviewerId;
    private String reviewerNickname;
    private String reviewerImageUrl;

    private Long revieweeId;
    private String revieweeNickname;

    private LocalDateTime createdAt;
}
