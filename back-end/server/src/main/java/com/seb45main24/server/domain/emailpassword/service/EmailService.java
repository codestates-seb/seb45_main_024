package com.seb45main24.server.domain.emailpassword.service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.emailpassword.dto.EmailMessage;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EmailService {

		private final JavaMailSender javaMailSender;
		private final AccountRepository accountRepository;
		private final AccountService accountService;

		@Value("${spring.mail.username}")
		private String from;

		// 이메일 내용 생성하고 임시 비밀번호로 회원 비밀번호 변경
		public EmailMessage createMailAndUpdatePassword(String accountEmail) {
			String tmpPassword = getTempPassword();
			EmailMessage email = new EmailMessage();
			email.setTo(accountEmail);
			email.setSubject("임시 비밀번호 안내 이메일입니다.");
			email.setMessage("안녕하세요. 임시비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 "
				+ tmpPassword + " 입니다." + " 로그인 후에 비밀번호를 변경을 해주세요");

			sendMail(email); // 메일 보내기
			updatePassword(tmpPassword, accountEmail); // tmpPassword로 비밀번호 변경

			return email;

		}

		// 메일 보내기
		public void sendMail(EmailMessage emailMessage) {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			try {
				MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
				mimeMessageHelper.setTo(emailMessage.getTo());
				mimeMessageHelper.setSubject(emailMessage.getSubject());
				mimeMessageHelper.setText(emailMessage.getMessage(), false);
				mimeMessageHelper.setFrom(new InternetAddress(from + "@naver.com"));
				javaMailSender.send(mimeMessage);
			} catch (MessagingException e) {
				throw  new RuntimeException(e);
			}
		}

		// 랜덤 함수로 임시 비빌번호 만들기
		private String getTempPassword() {
			String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			int passwordLength = 10;

			StringBuilder password = new StringBuilder();
			for(int i = 0; i < passwordLength; i++) {
				int random = (int) (Math.random() * str.length());
				password.append(str.charAt(random));
			}

			return password.toString();
		}

		// 임시 비밀번호로 업데이트
		private void updatePassword(String tmpPassword, String accountEmail) {
			String tmp = tmpPassword;
			Account accountInfo = accountRepository.findByEmail(accountEmail).orElseThrow(() ->
													new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
			accountService.changePassword(tmp, accountInfo.getId());
		}
	}
