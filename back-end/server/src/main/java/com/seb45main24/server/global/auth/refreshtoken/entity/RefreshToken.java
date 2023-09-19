package com.seb45main24.server.global.auth.refreshtoken.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Getter @Setter
@Table(name = "T_REFRESH_TOKEN")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REFRESH_TOKEN_ID")
	private Long id;

	@Column(name = "REFRESH_TOKEN", nullable = false)
	private String refreshToken;

	@Column(name = "KEY_EMAIL", nullable = false)
	private String keyEmail;


}
