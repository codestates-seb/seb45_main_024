package com.seb45main24.server.member_board.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MemberBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberBoardId;

}
