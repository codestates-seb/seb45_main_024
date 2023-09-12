package com.seb45main24.server.domain.alarm.repository;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}
