package com.seb45main24.server.domain.member_board.controller;

import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPatchDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPostDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;
import com.seb45main24.server.domain.member_board.mapper.MemberBoardMapper;
import com.seb45main24.server.domain.member_board.repository.MemberBoardRepository;
import com.seb45main24.server.domain.member_board.service.MemberBoardService;
import com.seb45main24.server.domain.member_board.service.MemberBoardTechTagService;
import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.project.mapper.ProjectMapper;
import com.seb45main24.server.domain.project.service.ProjectService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/memberboards")
public class MemberBoardController {
    private final MemberBoardRepository repository;
    private final MemberBoardMapper mapper;
    private final MemberBoardService service;
    private final MemberBoardTechTagService techTagService;
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;

    public MemberBoardController(MemberBoardRepository repository,
                                 MemberBoardMapper mapper,
                                 MemberBoardService service,
                                 MemberBoardTechTagService techTagService,
                                 ProjectService projectService,
                                 ProjectMapper projectMapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
        this.techTagService = techTagService;
        this.projectService = projectService;
        this.projectMapper = projectMapper;
    }

    @PostMapping
    public ResponseEntity postMemberBoard(@Valid @RequestBody MemberBoardPostDTO memberBoardPostDTO,
                                          @LoginAccountId Long loginAccountId) {
        System.out.println(loginAccountId + " : 멤버보드의 로그인 어카운트---------------");
        memberBoardPostDTO.setLoginAccountId(loginAccountId);

        MemberBoard memberBoard = mapper.memberBoardPostDtoToMember(memberBoardPostDTO);
        memberBoard.setViews(0);

        MemberBoard createMemberBoard = service.createMemberBoard(memberBoard);

        memberBoardPostDTO.getTechTagIdList().stream()
                .forEach(i -> {
                    MemberBoardTechTag memberBoardTechTag = new MemberBoardTechTag();

                    TechTag techTag = new TechTag();
                    techTag.setId(i);

                    MemberBoard member = new MemberBoard();
                    member.setMemberBoardId(createMemberBoard.getMemberBoardId());

                    memberBoardTechTag.setTechTag(techTag);
                    memberBoardTechTag.setMemberBoard(member);
                    techTagService.createTechTag(memberBoardTechTag);
                });

        memberBoardPostDTO.setMemberBoardId(createMemberBoard.getMemberBoardId());
        Project project = projectMapper.memberPostDtoToProject(memberBoardPostDTO);
        projectService.createProject(project);

        URI location = UriComponentsBuilder.newInstance()
                .path("/members" + "/{createMemberBoard.getMemberBoardId()}")
                .buildAndExpand(createMemberBoard.getMemberBoardId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{memberBoard-id}")
    public ResponseEntity patchMemberBoard(@PathVariable("memberBoard-id") @Positive long memberBoardId,
                                           @Valid @RequestBody MemberBoardPatchDTO memberBoardPatchDTO) {
        memberBoardPatchDTO.setMemberBoardId(memberBoardId);

        MemberBoard memberBoard = mapper.memberBoardPatchDtoToMember(memberBoardPatchDTO);

        MemberBoard updateMemberBoard = service.updateMemberBoard(memberBoard);

        List<MemberBoardTechTag> techTagList = techTagService.getTechTagByMemberBoardId(memberBoardId);

        techTagList.stream().forEach(list -> {
            techTagService.deleteTechTag(list.getMemberBoardTechTagId());
        });

        memberBoardPatchDTO.getTechTagIdList().stream()
                .forEach(i -> {
                    MemberBoardTechTag memberBoardTechTag = new MemberBoardTechTag();

                    TechTag techTag = new TechTag();
                    techTag.setId(i);

                    MemberBoard member = new MemberBoard();
                    member.setMemberBoardId(updateMemberBoard.getMemberBoardId());

                    memberBoardTechTag.setTechTag(techTag);
                    memberBoardTechTag.setMemberBoard(member);
                    techTagService.createTechTag(memberBoardTechTag);
                });

        List<MemberBoardTechTag> updateTechTagList = techTagService.getTechTagByMemberBoardId(memberBoardId);

        return new ResponseEntity<>(mapper.memberBoardToMemberBoardResponseDto(updateMemberBoard, updateTechTagList),
                HttpStatus.OK);
    }

    @GetMapping("/{memberBoard-id}")
    public ResponseEntity getMemberBoard(@PathVariable("memberBoard-id") @Positive long memberBoardId) {
        MemberBoard memberBoard = service.findMemberBoard(memberBoardId);

        service.addView(memberBoard);

        List<MemberBoardTechTag> techTagList = techTagService.getTechTagByMemberBoardId(memberBoardId);

        MemberBoardResponseDTO memberBoardResponseDTO =
                mapper.memberBoardToMemberBoardResponseDto(memberBoard, techTagList);

        return new ResponseEntity<>(memberBoardResponseDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMemberBoardList(@Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        Page<MemberBoard> pageMemberBoards = service.findMemberBoardList(page - 1, size);
        List<MemberBoard> memberBoardList = pageMemberBoards.getContent();

        List<List<MemberBoardTechTag>> doubleTechTagList = new ArrayList<>();
        memberBoardList.stream().forEach(memberBoard ->
                doubleTechTagList.add(techTagService.getTechTagByMemberBoardId(memberBoard.getMemberBoardId()))
        );

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberBoardListToMemberBoardResponseDtoList(
                memberBoardList, doubleTechTagList),
                pageMemberBoards), HttpStatus.OK);
    }

    @GetMapping("/view")
    public ResponseEntity getMemberBoardListByView(@Positive @RequestParam int page,
                                                   @Positive @RequestParam int size) {
        Page<MemberBoard> pageMemberBoards = service.findMemberBoardListByView(page - 1, size);
        List<MemberBoard> memberBoardList = pageMemberBoards.getContent();

        List<List<MemberBoardTechTag>> doubleTechTagList = new ArrayList<>();
        memberBoardList.stream().forEach(memberBoard ->
                doubleTechTagList.add(techTagService.getTechTagByMemberBoardId(memberBoard.getMemberBoardId()))
        );

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberBoardListToMemberBoardResponseDtoList(
                memberBoardList, doubleTechTagList),
                pageMemberBoards), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity getMemberBoardListByTitle(@RequestParam(required = false) String title,
                                                    @RequestParam(required = false) String position,
                                                    @RequestParam @Positive int page,
                                                    @RequestParam @Positive int size) {
        Page<MemberBoard> pageMemberBoardList = null;

        if(title != null) {
            pageMemberBoardList = service.getMemberBoardListByTitle(title, page - 1, size);

        } else {
            pageMemberBoardList = service.getMemberBoardListByPosition(position, page - 1, size);
        }

        List<MemberBoard> memberBoardList = pageMemberBoardList.getContent();

        List<List<MemberBoardTechTag>> doubleTechTagList = new ArrayList<>();
        memberBoardList.stream().forEach(memberBoard ->
                doubleTechTagList.add(techTagService.getTechTagByMemberBoardId(memberBoard.getMemberBoardId()))
        );

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberBoardListToMemberBoardResponseDtoList(
                memberBoardList, doubleTechTagList),
                pageMemberBoardList), HttpStatus.OK);
    }

    @GetMapping("/view/search")
    public ResponseEntity getMemberBoardListByTitleSortView(@RequestParam(required = false) String title,
                                                    @RequestParam(required = false) String position,
                                                    @RequestParam @Positive int page,
                                                    @RequestParam @Positive int size) {
        Page<MemberBoard> pageMemberBoardList = null;

        if(title != null) {
            pageMemberBoardList = service.getMemberBoardListByTitleSortView(title, page - 1, size);

        } else {
            pageMemberBoardList = service.getMemberBoardListByPositionSortView(position, page - 1, size);
        }

        List<MemberBoard> memberBoardList = pageMemberBoardList.getContent();

        List<List<MemberBoardTechTag>> doubleTechTagList = new ArrayList<>();
        memberBoardList.stream().forEach(memberBoard ->
                doubleTechTagList.add(techTagService.getTechTagByMemberBoardId(memberBoard.getMemberBoardId()))
        );

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberBoardListToMemberBoardResponseDtoList(
                memberBoardList, doubleTechTagList),
                pageMemberBoardList), HttpStatus.OK);
    }

    @DeleteMapping("/{memberBoard-id}")
    public ResponseEntity deleteMemberBoard(@PathVariable("memberBoard-id") @Positive int memberBoardId) {
        service.deleteMemberBoard(memberBoardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
