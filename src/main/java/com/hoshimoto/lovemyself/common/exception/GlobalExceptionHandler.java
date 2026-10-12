package com.hoshimoto.lovemyself.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

/**
 * 클린 아키텍처 22장 "인터페이스 어댑터": 안쪽에서 올라온 예외를 HTTP 상태 코드와 에러 응답 DTO로 바꾼다.
 * 【5】 전체 에러 접수 창구. 흐름 전체와 정리 표는 docs/study/EXCEPTION_GUIDE.md 참고
 *
 * - 직원(서비스): 문제가 생기면 "이거 안 돼요!" 하고 위로 넘기기만 함 (throw)
 * - 고객센터(GlobalExceptionHandler): 넘어온 문제를 받아서, 손님에게 정해진 안내문으로 답함 (400 + ErrorResponse)
 *
 * 핸들러
 * 1. 어떤 에러 코드로 할지 정하기
 * 2. 안내문(ErrorResponse) 만들어서 응답하기
 */
@RestControllerAdvice   // 【5】 이 클래스가 모든 컨트롤러의 에러를 받는다는 표시
public class GlobalExceptionHandler {

    // 【5】 service에서 던진 업무 규칙 위반 (예: ER002 출발지 = 도착지)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        return toResponse(e.getErrorCode());   // 【6】 신고서에서 위반 번호를 꺼냄 → 【7】
    }

    // 【A2】 필수 파라미터가 아예 없음 (예: ?departureAirport=FUK 만 보냄) → ER001
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingParam(MissingServletRequestParameterException e) {
        return toResponse(ErrorCode.ER001);    // 【A3】 창구가 직접 ER001을 붙임 → 【7】
    }

    // 【A2】 controller 파라미터 검사(@Pattern 등) 실패 (예: fuk, ABCD) → ER001
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(HandlerMethodValidationException e) {
        return toResponse(ErrorCode.ER001);    // 【A3】 창구가 직접 ER001을 붙임 → 【7】
    }

    // 【7】 GlobalExceptionHandler에쓰는 도우미 에러코드를 받아서
    // 상태코드 + ErrorResponse(JSON본문) 의 ResponseEntity를 돌려줌
    private ResponseEntity<ErrorResponse> toResponse(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getStatus())   // 【7】 상태 코드(400)는 ResponseEntity로 전달
            .body(new ErrorResponse(errorCode));              // 【8】 에러코드 명, 메세지는 ErrorResponse로 전달
        //         ResponseEntity                 ← 【9】 브라우저가 받는 최종 응답
        // ├─ status : 400 (BAD_REQUEST)
        // └─ body   : ErrorResponse
        //              ├─ code    : "ER001"
        //              └─ message : "出発地・到着地を選択してください。"
    }
    // List<String>                    // 리스트를 반환하는데, 안에 든 것은 String
    // ResponseEntity<ErrorResponse>   // 응답을 반환하는데, 안에 든 본문은 ErrorResponse
}