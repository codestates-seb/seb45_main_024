package com.seb45main24.server.domain.image.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.entity.ProjectDetails;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "IMAGES")
public class Image extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IMAGE_ID")
	private Long id;

	private String imageName;

	private String imageUrl;
	private String imageType;

	@Builder
	public Image(Long id, String imageName, String imageUrl, String imageType) {
		this.id = id;
		this.imageName = imageName;
		this.imageUrl = imageUrl;
		this.imageType = imageType;
	}

	public enum ImageClassification {
		PROFILE_IMG("프로필 이미지"),
		MEM_BOARD_IMG("팀원 찾기 게시판 이미지"),
		REVIEW_IMG("리뷰 이미지"),
		PROJECT_IMG("참여 프로젝트 이미지");

		@Getter
		private String type;

		ImageClassification(String type) {
			this.type = type;
		}

	}
}
