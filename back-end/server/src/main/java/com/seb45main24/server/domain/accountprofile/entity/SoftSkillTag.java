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

@Getter
@NoArgsConstructor
@Entity
@Table(name = "SOFT_SKILL_TAGS")
public class SoftSkillTag extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SOFT_SKILL_TAG_ID")
	private Long id;

	private String techName;

	@ManyToOne
	@JoinColumn(name = "ACCOUNT_PROFILE_ID")
	private AccountProfile accountProfile;
}
