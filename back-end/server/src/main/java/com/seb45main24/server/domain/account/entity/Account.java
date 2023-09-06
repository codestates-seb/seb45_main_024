package com.seb45main24.server.domain.account.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.mypage.entity.AccountProfile;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "ACCOUNTS")
public class Account extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACCOUNTS_ID")
	private Long id;

	private String email;

	private String password;

	private String nickname;

	@OneToOne(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private AccountProfile accountProfile;

	@OneToOne(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private Image image;

	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles = new ArrayList<>();


	public Account(String email, String password, String nickname) {
		this.email = email;
		this.password = password;
		this.nickname = nickname;
	}

}
