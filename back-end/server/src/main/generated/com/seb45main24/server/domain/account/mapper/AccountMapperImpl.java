package com.seb45main24.server.domain.account.mapper;

import com.seb45main24.server.domain.account.dto.AccountDto.Post;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
import com.seb45main24.server.domain.account.entity.Account;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-06T18:48:16+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AccountMapperImpl implements AccountMapper {

    @Override
    public Account accountPostDtoToAccount(Post postDto) {
        if ( postDto == null ) {
            return null;
        }

        Account account = new Account();

        account.setEmail( postDto.getEmail() );
        account.setPassword( postDto.getPassword() );
        account.setNickname( postDto.getNickname() );

        return account;
    }

    @Override
    public Account accountPatchDtoToAccount(AccountPatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Account account = new Account();

        account.setPassword( patchDto.getPassword() );
        account.setNickname( patchDto.getNickname() );

        return account;
    }
}
