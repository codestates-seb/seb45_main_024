package com.seb45main24.server.domain.accountprofile.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ACCOUNT_PROFILES")
public class AccountProfile extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACCOUNT_PROFILE_ID")
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String coverLetter;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ACCOUNT_ID")
	private Account account;

	@OneToMany(mappedBy = "accountProfile", cascade = CascadeType.ALL)
	private List<HardSkillTag> hardSkillTags = new ArrayList<>();

	@OneToMany(mappedBy = "accountProfile", cascade = CascadeType.ALL)
	private List<SoftSkillTag> softSkillTags = new ArrayList<>();

	@OneToMany(mappedBy = "accountProfile", cascade = CascadeType.ALL)
	private List<ProjectDetails> projectDetails = new ArrayList<>();

	@Builder
	public AccountProfile(String coverLetter, Account account, List<HardSkillTag> hardSkillTags,
		List<SoftSkillTag> softSkillTags, List<ProjectDetails> projectDetails) {
		this.coverLetter = coverLetter;
		this.account = account;
		this.hardSkillTags = hardSkillTags;
		this.softSkillTags = softSkillTags;
		this.projectDetails = projectDetails;
	}



}
