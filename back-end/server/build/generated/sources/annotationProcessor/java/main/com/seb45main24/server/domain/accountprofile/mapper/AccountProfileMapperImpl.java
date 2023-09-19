package com.seb45main24.server.domain.accountprofile.mapper;

import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile.AccountProfileBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class AccountProfileMapperImpl implements AccountProfileMapper {

    @Override
    public AccountProfile requestToAccountProfile(ProfilePostRequest request) {
        if ( request == null ) {
            return null;
        }

        AccountProfileBuilder accountProfile = AccountProfile.builder();

        accountProfile.coverLetter( request.getCoverLetter() );

        return accountProfile.build();
    }
}
