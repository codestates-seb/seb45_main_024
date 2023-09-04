package com.seb45main24.server.domain.member_board.entity;

import com.seb45main24.server.global.auditing.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MemberBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberBoardId;

    private String title;

    private String content;

    private String status;

    private Integer views;

    private String position;

    private LocalDateTime startDate;

    private LocalDateTime endDate;
}
