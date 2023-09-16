package com.seb45main24.server.domain.teamboard.entity;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.global.auditing.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class TeamBoardTechTag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamBoardTechTagId;

    @ManyToOne
    @JoinColumn(name = "TECH_TAG_ID")
    private TechTag techTag;

    @ManyToOne
    @JoinColumn(name = "team_board_id")
    private TeamBoard teamBoard;
}
