package com.seb45main24.server.domain.mypage.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.global.auditing.Auditable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MYPAGES")
public class Mypage extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MY_PAGE_ID")
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String coverLetter;

	// @OneToOne
	// private Account account;
	//
	// @OneToMany
	// private List<TechTag> techTagList;

	// private List<SoftSkillTag> softSkillTagList;
	//
	// private List<HardSkillTag> hardSkillTagList;

	@OneToMany(mappedBy = "mypage", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
	private List<MypageImage> mypageImages;


}
