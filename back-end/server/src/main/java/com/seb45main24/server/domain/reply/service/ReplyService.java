package com.seb45main24.server.domain.reply.service;

import com.seb45main24.server.domain.reply.entity.Reply;
import com.seb45main24.server.domain.reply.repository.ReplyRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ReplyService {
    private final ReplyRepository repository;

    public ReplyService(ReplyRepository repository) {
        this.repository = repository;
    }

    public Reply createReply(Reply reply) {
        Reply saveReply = repository.save(reply);

        return saveReply;
    }

    public Reply updateReply(Reply reply) {
        Reply findReply = findVerifiedReply(reply.getReplyId());

        Optional.ofNullable(reply.getContent())
                .ifPresent(content -> findReply.setContent(content));

        Reply saveReply = repository.save(findReply);

        return saveReply;
    }

    public void deleteReply(long replyId) {
        Reply reply = findVerifiedReply(replyId);

        repository.delete(reply);
    }

    private Reply findVerifiedReply(long replyId){
        Optional<Reply> optionalReply = repository.findById(replyId);

        Reply findReply = optionalReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND));

        return findReply;
    }
}