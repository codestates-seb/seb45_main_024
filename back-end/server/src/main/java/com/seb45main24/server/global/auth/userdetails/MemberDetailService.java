package com.seb45main24.server.global.auth.userdetails;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

@Component
public class MemberDetailService implements UserDetailsService {

	private final AccountRepository accountRepository;
	private final CustomAuthorityUtils authorityUtils;

	public MemberDetailService(AccountRepository accountRepository, CustomAuthorityUtils authorityUtils) {
		this.accountRepository = accountRepository;
		this.authorityUtils = authorityUtils;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Account> optionalUser = accountRepository.findByEmail(username);
		Account findAccount = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));

		return new MemberDetails(findAccount);
	}

	private final class MemberDetails extends Account implements UserDetails {

		MemberDetails(Account account) {
			setId(account.getId());
			setEmail(account.getEmail());
			setPassword(account.getPassword());
			setRoles(account.getRoles());
		}

		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() { // 조회한 회원의 이메일 정보를 이용해 Role 기반의 정보 컬렉션 생성
			return authorityUtils.createAuthorities(this.getRoles());
		}

		@Override
		public String getUsername() {
			return getEmail();
		}

		@Override
		public boolean isAccountNonExpired() {
			return true;
		}

		@Override
		public boolean isAccountNonLocked() {
			return true;
		}

		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}

		@Override
		public boolean isEnabled() {
			return true;
		}
	}
}
