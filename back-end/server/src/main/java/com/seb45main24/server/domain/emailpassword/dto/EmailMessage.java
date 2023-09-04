package com.seb45main24.server.domain.emailpassword.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailMessage {
	private String to;

	private String subject;

	private String message;
}

