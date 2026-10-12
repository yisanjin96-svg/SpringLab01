package com.hoshimoto.lovemyself.common.exception;

/**
 * 【8】 손님에게 보내는 안내문: 브라우저에 보낼 JSON 모양 {"code": ..., "message": ...}
 * 흐름 전체는 docs/study/EXCEPTION_GUIDE.md 참고
 */
public class ErrorResponse {

    private final String code;
    private final String message;

    // 【8】 핸들러의 toResponse에서 new ErrorResponse(errorCode) 하면 실행됨
    public ErrorResponse(ErrorCode errorCode){
        this.code = errorCode.name();            // 【8】 "ER002" (enum 이름 그대로)
        this.message = errorCode.getMessage();   // 【8】 "出発地と到着地が同じです。"
    }

    // 【9】 getter 1개 = JSON 항목 1개 → "code"
    public String getCode() {
        return code;
    }

    // 【9】 getter 1개 = JSON 항목 1개 → "message"
    public String getMessage() {
        return message;
    }

}
