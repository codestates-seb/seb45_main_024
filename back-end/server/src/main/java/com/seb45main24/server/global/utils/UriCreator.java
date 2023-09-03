package com.seb45main24.server.global.utils;

import java.net.URI;

import org.springframework.web.util.UriComponentsBuilder;

public class UriCreator {
	public static URI createUri(String defaultUrl, Long resourceId) {
		return UriComponentsBuilder
				.newInstance()
				.path(defaultUrl + "/{resourceId}") // 동적인 값 삽입
				.buildAndExpand(resourceId) // 위에서 지정한 경로 템플릿을 확장하고 사용되는 변수를 값으로 채우기 위한 메서드
				.toUri();
	}
}
