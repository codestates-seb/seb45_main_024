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

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "IMAGES")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IMAGE_ID")
	private Long id;

	private String originName; // 원본 파일명

	private String saveName; // 저장 파일명(UUID 고유 식별자)

	private Long size; // 파일 크기

	private String imageUrl;

	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	private ImageClassification imageClsf;

	@Builder
	public Image(Long id, String originName, String saveName, Long size, String imageUrl, LocalDateTime createdAt,
		ImageClassification imageClsf) {
		this.id = id;
		this.originName = originName;
		this.saveName = saveName;
		this.size = size;
		this.imageUrl = imageUrl;
		this.createdAt = createdAt;
		this.imageClsf = imageClsf;
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
