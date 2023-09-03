package com.seb45main24.server.global.auth.config;



import static org.springframework.security.config.Customizer.*;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.global.auth.filter.JwtAuthenticationFilter;
import com.seb45main24.server.global.auth.filter.JwtVerificationFilter;
import com.seb45main24.server.global.auth.handler.AccountAuthenticationFailureHandler;
import com.seb45main24.server.global.auth.jwt.JwtTokenizer;
import com.seb45main24.server.global.auth.utils.CustomAuthorityUtils;

@Configuration
public class SecurityConfiguration {
	private final JwtTokenizer jwtTokenizer;
	private final CustomAuthorityUtils customAuthorityUtils;
	private final AccountRepository accountRepository;

	public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils customAuthorityUtils,
		AccountRepository accountRepository) {
		this.jwtTokenizer = jwtTokenizer;
		this.customAuthorityUtils = customAuthorityUtils;
		this.accountRepository = accountRepository;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.headers().frameOptions().sameOrigin()
			.and()
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.cors(withDefaults())
			.formLogin().disable()
			.httpBasic().disable()
			.apply(new CustomFilterConfigurer())
			.and()
			.authorizeRequests(authorize -> authorize
				.anyRequest().permitAll()
			);
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처에 대해 스크립트 기반의 HTTP 통신을 허용하도록 설정
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE")); // 지정한 HTTP Method에 대한 HTTP 통신 허용

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration); // 앞에서 구성한 CORS 정책 적용하기

		return source;
	}

	// JwtAuthenticationFilter 등록
	public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
		@Override
		public void configure(HttpSecurity builder) throws Exception {
			AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
			jwtAuthenticationFilter.setFilterProcessesUrl("/accounts/login");

			// handler 추가
			jwtAuthenticationFilter.setAuthenticationFailureHandler(new AccountAuthenticationFailureHandler());

			JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);

			builder.addFilter(jwtAuthenticationFilter)
					.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); // Spring Security Filter Chain에 추가
		}
	}

}
