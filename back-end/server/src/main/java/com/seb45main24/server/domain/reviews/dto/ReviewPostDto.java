package com.seb45main24.server.domain.reviews.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class ReviewPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String project_url;

    @NotBlank
    private String intro;

    @NotBlank
    private String content;

    @Positive
    private Long accountId;

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

}
