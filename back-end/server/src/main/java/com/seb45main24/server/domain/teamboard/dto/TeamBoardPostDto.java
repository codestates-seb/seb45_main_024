package com.seb45main24.server.domain.teamboard.dto;

import com.seb45main24.server.domain.account.entity.Account;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class TeamBoardPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String position;

    @Nullable
    private List<String> keywords;

    @Positive
    private long accountId;

    public Account getAccount() {
        Account account = new Account();
        account.setId(accountId);
        return account;
    }

}

