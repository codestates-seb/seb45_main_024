package com.seb45main24.server.domain.accountprofile.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.seb45main24.server.domain.member_board.entity.MemberBoardTechTag;
import com.seb45main24.server.domain.member_board.service.MemberBoardTechTagService;
import com.seb45main24.server.domain.teamboard.entity.TeamBoardTechTag;
import com.seb45main24.server.domain.teamboard.service.TeamBoardTechTagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.accountprofile.dto.ProfilePostRequest;
import com.seb45main24.server.domain.accountprofile.dto.ProfileResponse;
import com.seb45main24.server.domain.accountprofile.entity.AccountProfile;
import com.seb45main24.server.domain.accountprofile.mapper.AccountProfileMapper;
import com.seb45main24.server.domain.accountprofile.service.AccountProfileService;
import com.seb45main24.server.domain.member_board.dto.MemberBoardResponseDTO;
import com.seb45main24.server.domain.member_board.entity.MemberBoard;
import com.seb45main24.server.domain.member_board.mapper.MemberBoardMapper;
import com.seb45main24.server.domain.member_board.service.MemberBoardService;
import com.seb45main24.server.domain.teamboard.dto.TeamBoardResponseDto;
import com.seb45main24.server.domain.teamboard.entity.TeamBoard;
import com.seb45main24.server.domain.teamboard.mapper.TeamBoardMapper;
import com.seb45main24.server.domain.teamboard.service.TeamBoardService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypages")
public class AccountProfileController {

	private final AccountProfileService accountProfileService;
	private final TeamBoardService teamBoardService;
	private final TeamBoardMapper teamBoardMapper;
	private final MemberBoardService memberBoardService;
	private final MemberBoardMapper memberBoardMapper;
	private final MemberBoardTechTagService memberBoardTechTagService;
	private final TeamBoardTechTagService teamBoardTechTagService;

	@PatchMapping("/profile/{account-id}")
	public ResponseEntity patchAccountProfile(@LoginAccountId Long loginAccountId,
												@PathVariable("account-id") Long accountId,
												@RequestBody @Valid ProfilePostRequest postRequest) {

		accountProfileService.updateAccountProfile(loginAccountId, accountId, postRequest);
		ProfileResponse response = accountProfileService.findAccountProfile(accountId);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/profile/{account-id}")
	public ResponseEntity getAccountProfile(@PathVariable("account-id") Long accountId) {

		ProfileResponse response = accountProfileService.findAccountProfile(accountId);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/summary/{account-id}") // 내가 쓴 글 조회
	public ResponseEntity getMyPost(@PathVariable("account-id") Long accountId) {
		Map<String, Object> responseMap = new HashMap<>();

		// 팀찾기 조회 : 파라미터 아이디 이용해서
		List<TeamBoard> teamBoards = teamBoardService.getTeamBoards(accountId);
		List<List<TeamBoardTechTag>> techTagLists = new ArrayList<>();
		teamBoards.stream().forEach(teamBoard ->
				techTagLists.add(teamBoardTechTagService.getTechTagByTeamBoardId(teamBoard.getTeamBoardId())));
		List<TeamBoardResponseDto> teamBoardResponseDto = teamBoardMapper.teamBoardsToTeamBoardResponseDtoList(teamBoards, techTagLists);

		// 팀원찾기 조회 : 파라미터 아이디 이용해서 (member-board : accountId == writerId)
		List<MemberBoard> memberBoards = memberBoardService.getMemberBoards(accountId);
		List<List<MemberBoardTechTag>> doubleTechTagList = new ArrayList<>();
		memberBoards.stream().forEach(memberBoard ->
				doubleTechTagList.add(memberBoardTechTagService.getTechTagByMemberBoardId(memberBoard.getMemberBoardId()))
		);
		List<MemberBoardResponseDTO> memberBoardResponseDto =
				memberBoardMapper.memberBoardListToMemberBoardResponseDtoList(memberBoards, doubleTechTagList);

		responseMap.put("teamBoards", teamBoardResponseDto);
		responseMap.put("memberBoards", memberBoardResponseDto);

		return new ResponseEntity<>(responseMap, HttpStatus.OK);
	}
}
