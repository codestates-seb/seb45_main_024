package com.seb45main24.server.domain.account.mapper;

import com.seb45main24.server.domain.account.dto.AccountDto.Post;
import com.seb45main24.server.domain.account.dto.AccountPatchDto;
import com.seb45main24.server.domain.account.entity.Account;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
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
