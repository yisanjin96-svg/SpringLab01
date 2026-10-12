package com.hoshimoto.lovemyself.common.exception;

import org.springframework.http.HttpStatus;

/**
 * 【1】 위반 번호 목록: 에러 번호마다 HTTP 상태 코드와 메시지를 묶어 둔다.
 * 흐름 전체는 docs/study/EXCEPTION_GUIDE.md 참고
 */
public enum ErrorCode {
    // 【1】 번호(ER001) + 상태 코드(400) + 메시지를 한 묶음으로 정의
    ER001(HttpStatus.BAD_REQUEST, "出発地・到着地を選択してください。"),
    ER002(HttpStatus.BAD_REQUEST, "出発地と到着地が同じです。");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    // 【7】 핸들러의 toResponse가 상태 코드(400)를 꺼낼 때 사용
    public HttpStatus getStatus() {
        return status;
    }

    // 【4】 BusinessException 생성자, 【8】 ErrorResponse 생성자가 메시지를 꺼낼 때 사용
    public String getMessage() {
        return message;
    }

    // enum은 안에 적어둔 에러1에러2만 존재한다고 함 클래스는 객체생성으로 다양하게 만들수 있음.

}
