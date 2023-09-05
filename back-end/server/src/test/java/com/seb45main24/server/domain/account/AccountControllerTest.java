package com.seb45main24.server.domain.account;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.*;
import static org.springframework.test.util.AssertionErrors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.google.gson.Gson;
import com.seb45main24.server.domain.account.dto.AccountDto;
import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.mapper.AccountMapper;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.global.auth.dto.LoginDto;

@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private Gson gson;

	@Autowired
	private AccountService accountService;

	@Autowired
	private AccountMapper mapper;


	@DisplayName("계정 등록 테스트")
//	@Test
	void postAccountTest() throws Exception {
		//given
		AccountDto.Post post = new AccountDto.Post("테스트1", "test@gmail.com", "1234");
		String content = gson.toJson(post);

		//when
		ResultActions actions =
			mockMvc.perform(
								post("/accounts/signup")
									.accept(MediaType.APPLICATION_JSON)
									.contentType(MediaType.APPLICATION_JSON)
									.content(content)
							);

		//then
		actions
			.andExpect(status().isCreated())
			.andExpect(header().string("Location", is(startsWith("/accounts"))));
	}

	@DisplayName("로그인 성공 테스트")
//	@Test
	void loginSuccessTest() throws Exception {
		AccountDto.Post post = new AccountDto.Post("테스트1", "test@gmail.com", "1234");
		accountService.createAccount(mapper.accountPostDtoToAccount(post));

		LoginDto loginDto = new LoginDto("test@gmail.com", "1234");
		String loginDtoJson = gson.toJson(loginDto);

		ResultActions actions =
			mockMvc.perform(
							post("/accounts/login")
								.content(loginDtoJson)
								.contentType(MediaType.APPLICATION_JSON)
		);

		actions
			.andExpect(status().is2xxSuccessful());
	}
}
