package com.hoshimoto.lovemyself.common.exception;

/**
 * 클린 아키텍처 20장 "업무 규칙": 업무 규칙 위반을 ErrorCode와 함께 알려, 처리 방법은 바깥(Handler)에 맡긴다.
 * 【4】 위반 신고서: 위반 번호(ErrorCode)를 담아서 위로 넘긴다. 흐름 전체는 docs/study/EXCEPTION_GUIDE.md 참고
 */
public class BusinessException extends RuntimeException {
    // RuntimeException을 상속 throw로 에러 처리 가능해짐.

    private final ErrorCode errorCode;

    // 【4】 service에서 new BusinessException(ErrorCode.ER002) 하면 실행됨
    public BusinessException(ErrorCode errorCode) {
        // 부모 클래스 생성자에 (에러코드.겟메시지) 넘기기
        super(errorCode.getMessage());
        this.errorCode = errorCode;   // 【4】 신고서 안에 위반 번호를 적어 둠
    }

    // 【6】 핸들러가 신고서에서 위반 번호를 꺼낼 때 사용
    public ErrorCode getErrorCode() {
        return errorCode;
    }
}

// service:  throw new BusinessException(ErrorCode.ER002)   ← 【3】 ER002를 담아서 던짐
// handler:  e.getErrorCode()                               ← 【6】 ER002를 꺼냄
//           → toResponse(ER002)                            ← 【7】
