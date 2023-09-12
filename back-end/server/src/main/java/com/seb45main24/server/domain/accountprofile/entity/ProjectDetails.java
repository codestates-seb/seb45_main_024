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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "PROJECT_DETAILS")
public class ProjectDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROJECT_DETAIL_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "ACCOUNT_PROFILE_ID")
	private AccountProfile accountProfile;

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "image_id")
	private Image image;

	private String projectTitle;

	private String projectUrl;

}
