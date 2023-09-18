package com.seb45main24.server.domain.accountprofile.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PROFILE_TECH_TAGS")
public class ProfileTechTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROFILE_TECH_TAG_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "tech_tag_id")
	private TechTag techTag;

	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "account_profile_id")
	private AccountProfile accountProfile;
}
