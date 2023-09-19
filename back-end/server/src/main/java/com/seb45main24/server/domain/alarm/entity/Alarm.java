package com.seb45main24.server.domain.alarm.entity;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
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
public class Alarm extends Auditable {
    public enum AlarmType {
        ACCEPT,
        REPLY
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    @Enumerated(EnumType.STRING)
    private AlarmType alarmType;

    private Boolean isChecked;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "WRITER_ID")
    private Account writer;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "TARGET_ID")
    private Account target;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "MEMBER_BOARD_ID")
    private MemberBoard memberBoard;
}
