package com.seb45main24.server.domain.reply.controller;

import com.seb45main24.server.domain.alarm.entity.Alarm;
import com.seb45main24.server.domain.alarm.mapper.AlarmMapper;
import com.seb45main24.server.domain.alarm.service.AlarmService;
import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.project.mapper.ProjectMapper;
import com.seb45main24.server.domain.project.service.ProjectService;
import com.seb45main24.server.domain.reply.dto.ReplyAcceptDTO;
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

    private final AlarmService alarmService;
    private final AlarmMapper alarmMapper;

    private final ProjectService projectService;
    private final ProjectMapper projectMapper;

    public ReplyController(ReplyRepository repository,
                           ReplyMapper mapper,
                           ReplyService service,
                           AlarmService alarmService,
                           AlarmMapper alarmMapper,
                           ProjectService projectService,
                           ProjectMapper projectMapper){
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
        this.alarmService = alarmService;
        this.alarmMapper = alarmMapper;
        this.projectService = projectService;
        this.projectMapper = projectMapper;
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

    @PatchMapping("/accept/{reply-id}")
    public ResponseEntity patchAlarmReply(@PathVariable("reply-id") @Positive long replyId,
                                          @Valid @RequestBody ReplyAcceptDTO replyAcceptDTO,
                                          @LoginAccountId Long loginAccountId) {
        Reply findReply = service.findReply(replyId);
        replyAcceptDTO.setAccountId(loginAccountId);
        replyAcceptDTO.setReplyId(replyId);
        replyAcceptDTO.setMemberBoardId(findReply.getMemberBoard().getMemberBoardId());
        replyAcceptDTO.setWriterId(findReply.getWriter().getId());

        Reply reply = mapper.replyAcceptDtoToReply(replyAcceptDTO);

        Reply updateReply = service.updateReply(reply);

        if(replyAcceptDTO.getAcceptType() == Reply.AcceptType.ACCEPT) {
            Alarm alarm = alarmMapper.replyAcceptDtoToAlarm(replyAcceptDTO);
            alarmService.createAlarm(alarm);

            Project project = projectMapper.replyAcceptDtoToProject(replyAcceptDTO);
            projectService.createProject(project);
        }

        return new ResponseEntity<>(mapper.replyToReplyResponseDto(updateReply), HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deleteReply(@PathVariable("reply-id") @Positive long replyId) {
        service.deleteReply(replyId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
