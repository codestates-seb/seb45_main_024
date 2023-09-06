package com.seb45main24.server.domain.reply.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReplyPostDTO {
    @NotBlank
    private String content;
}
