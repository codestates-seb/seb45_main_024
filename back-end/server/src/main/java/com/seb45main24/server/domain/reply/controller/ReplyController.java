package com.seb45main24.server.domain.reply.controller;

import com.seb45main24.server.domain.reply.dto.ReplyPatchDTO;
import com.seb45main24.server.domain.reply.dto.ReplyPostDTO;
import com.seb45main24.server.domain.reply.entity.Reply;
import com.seb45main24.server.domain.reply.mapper.ReplyMapper;
import com.seb45main24.server.domain.reply.repository.ReplyRepository;
import com.seb45main24.server.domain.reply.service.ReplyService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/replys")
public class ReplyController {
    private final ReplyRepository repository;
    private final ReplyMapper mapper;
    private final ReplyService service;

    public ReplyController(ReplyRepository repository,
                           ReplyMapper mapper,
                           ReplyService service){
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postReply(@Valid @RequestBody ReplyPostDTO replyPostDTO,
                                    @LoginAccountId Long loginAccountId) {
        replyPostDTO.setLoginAccountId(loginAccountId);
        replyPostDTO.setAcceptType(Reply.AcceptType.NONE);

        Reply reply = mapper.replyPostDtoToReply(replyPostDTO);

        Reply createReply = service.createReply(reply);

        URI location = UriComponentsBuilder.newInstance()
                .path("/replys" + "/{createReply.getReplyId()}")
                .buildAndExpand(createReply.getReplyId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchReply(@PathVariable("reply-id") @Positive long replyId,
                                     @Valid @RequestBody ReplyPatchDTO replyPatchDTO) {
        replyPatchDTO.setReplyId(replyId);

        Reply reply = mapper.replyPatchDtoToReply(replyPatchDTO);

        Reply updateReply = service.updateReply(reply);

        return new ResponseEntity<>(mapper.replyToReplyResponseDto(updateReply), HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deleteReply(@PathVariable("reply-id") @Positive long replyId) {
        service.deleteReply(replyId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
