package com.hoshimoto.lovemyself.common.exception;

/**
 * 클린 아키텍처 20장 "업무 규칙": 업무 규칙 위반을 ErrorCode와 함께 알려, 처리 방법은 바깥(Handler)에 맡긴다.
 */
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}