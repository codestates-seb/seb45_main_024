package com.seb45main24.server.domain.reviews.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class ReviewPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String projectUrl;

    @NotBlank
    private String intro;

    @NotBlank
    private String content;

    @Positive
    private Long revieweeId;   // 리뷰대상자  accountId

    @Positive
    private Long reviewerId;

    public void setRevieweeId(Long revieweeId) {
        this.revieweeId = revieweeId;
    }

}
