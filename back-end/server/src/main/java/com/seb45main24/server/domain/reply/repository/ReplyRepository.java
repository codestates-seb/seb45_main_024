package com.seb45main24.server.domain.reply.repository;

import com.seb45main24.server.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
