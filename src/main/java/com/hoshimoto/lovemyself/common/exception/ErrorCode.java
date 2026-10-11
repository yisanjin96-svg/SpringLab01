package com.hoshimoto.lovemyself.common.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    ER001(HttpStatus.BAD_REQUEST, "出発地・到着地を選択してください。"),
    ER002(HttpStatus.BAD_REQUEST, "出発地と到着地が同じです。");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    // euum은 안에 적어둔 에러1에러2만 존재한다고 함 클래스는 객체생성으로 다양하게 만들수 있음.
    
}
