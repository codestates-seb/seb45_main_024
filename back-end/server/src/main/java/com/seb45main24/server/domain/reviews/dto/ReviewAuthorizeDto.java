package com.seb45main24.server.domain.reviews.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ReviewAuthorizeDto {
    @Positive
    private Long revieweeId;   // 리뷰대상자

    @Positive
     private Long memberBoardId;

}
