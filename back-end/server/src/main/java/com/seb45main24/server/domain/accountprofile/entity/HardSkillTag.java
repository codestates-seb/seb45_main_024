package com.seb45main24.server.domain.accountprofile.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.seb45main24.server.global.auditing.Auditable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "HARD_SKILL_TAGS")
public class HardSkillTag extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HARD_SKILL_TAG_ID")
	private Long id;

	private String tagName;

	@ManyToOne
	@JoinColumn(name = "ACCOUNT_PROFILE_ID")
	private AccountProfile accountProfile;
}
