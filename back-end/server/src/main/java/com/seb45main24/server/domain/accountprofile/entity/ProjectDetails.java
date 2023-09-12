package com.seb45main24.server.domain.accountprofile.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "PROJECT_DETAILS")
public class ProjectDetails extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROJECT_DETAIL_ID")
	private Long id;

	private String projectTitle;

	private String projectUrl;

	private String imageUrl;

	@ManyToOne
	@JoinColumn(name = "ACCOUNT_PROFILE_ID")
	private AccountProfile accountProfile;
}
