package com.seb45main24.server.domain.member_board.controller;

import com.seb45main24.server.domain.member_board.dto.MemberBoardPatchDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardPostDTO;
import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.member_board.mapper.MemberBoardMapper;
import com.seb45main24.server.domain.member_board.repository.MemberBoardRepository;
import com.seb45main24.server.domain.member_board.service.MemberBoardService;
import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/memberboards")
public class MemberBoardController {
    private final MemberBoardRepository repository;
    private final MemberBoardMapper mapper;
    private final MemberBoardService service;

    public MemberBoardController(MemberBoardRepository repository,
                                 MemberBoardMapper mapper,
                                 MemberBoardService service) {
        this.repository = repository;
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postMemberBoard(@Valid @RequestBody MemberBoardPostDTO memberBoardPostDTO,
                                          @LoginAccountId Long loginAccountId) {
        memberBoardPostDTO.setLoginAccountId(loginAccountId);

        MemberBoard memberBoard = mapper.memberBoardPostDtoToMember(memberBoardPostDTO);
        memberBoard.setViews(0);

        MemberBoard createMemberBoard = service.createMemberBoard(memberBoard);

        URI location = UriComponentsBuilder.newInstance()
                .path("/members" + "/{createMemberBoard.getMemberBoardId()}")
                .buildAndExpand(createMemberBoard.getMemberBoardId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{memberBoard-id}")
    public ResponseEntity patchMemberBoard(@PathVariable("memberBoard-id") @Positive int memberBoardId,
                                           @Valid @RequestBody MemberBoardPatchDTO memberBoardPatchDTO) {
        memberBoardPatchDTO.setMemberBoardId(memberBoardId);

        MemberBoard memberBoard = mapper.memberBoardPatchDtoToMember(memberBoardPatchDTO);

        MemberBoard updateMemberBoard = service.updateMemberBoard(memberBoard);

        return new ResponseEntity<>(mapper.memberBoardToMemberBoardResponseDto(updateMemberBoard), HttpStatus.OK);
    }

    @GetMapping("/{memberBoard-id}")
    public ResponseEntity getMemberBoard(@PathVariable("memberBoard-id") @Positive long memberBoardId) {
        MemberBoard memberBoard = service.findMemberBoard(memberBoardId);

        MemberBoardResponseDTO memberBoardResponseDTO = mapper.memberBoardToMemberBoardResponseDto(memberBoard);

        return new ResponseEntity<>(memberBoardResponseDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMemberBoardList(@Positive @RequestParam int page) {
        Page<MemberBoard> pageMemberBoards = service.findMemberBoardList(page - 1);
        List<MemberBoard> memberBoardList = pageMemberBoards.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberBoardListToMemberBoardResponseDtoList(memberBoardList),
                pageMemberBoards), HttpStatus.OK);
    }

    @DeleteMapping("/{memberBoard-id}")
    public ResponseEntity deleteMemberBoard(@PathVariable("memberBoard-id") @Positive int memberBoardId) {
        service.deleteMemberBoard(memberBoardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
