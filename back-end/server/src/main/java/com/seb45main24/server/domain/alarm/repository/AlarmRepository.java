package com.seb45main24.server.domain.alarm.repository;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByTargetId(long targetId);

    List<Alarm>findByTargetIdAndIsChecked(long targetId, boolean isChecked);
}
