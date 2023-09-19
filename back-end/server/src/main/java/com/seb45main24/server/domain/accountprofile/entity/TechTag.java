package com.seb45main24.server.domain.accountprofile.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "TECH_TAGS")
public class TechTag extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TECH_TAG_ID")
	private Long Id;

	private String techName;

	@Enumerated(EnumType.STRING)
	public TagType tagType;

	public enum TagType {
		BACK_END("백엔드"),
		FRONT_END("프론트엔드"),
		MOBILE("모바일"),
		ETC("기타");

		@Getter
		private String type;

		TagType(String type) {
			this.type = type;
		}
	}
}
