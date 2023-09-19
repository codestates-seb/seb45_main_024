package com.seb45main24.server.domain.member_board.entity;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.global.auditing.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MemberBoardTechTag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberBoardTechTagId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "TECH_TAG_ID")
    private TechTag techTag;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "MEMBER_BOARD_ID")
    private MemberBoard memberBoard;
}
