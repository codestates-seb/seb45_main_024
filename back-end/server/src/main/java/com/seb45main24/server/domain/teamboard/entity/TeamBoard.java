package com.seb45main24.server.domain.teamboard.entity;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.global.auditing.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "team_boards")
public class TeamBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "team_board_id")
    private Long teamBoardId;


    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String position;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> keywords = new ArrayList<>();

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "account_id")
    private Account account;

}
