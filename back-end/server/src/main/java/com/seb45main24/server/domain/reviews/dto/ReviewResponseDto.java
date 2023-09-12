package com.seb45main24.server.domain.reviews.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReviewResponseDto {
    private Long reviewId;
    private String title;
    private String project_url;
    private String intro;
    private String content;
    private LocalDateTime createdAt;
}
