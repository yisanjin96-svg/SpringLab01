package com.hoshimoto.lovemyself.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

/**
 * 클린 아키텍처 22장 "인터페이스 어댑터": 안쪽에서 올라온 예외를 HTTP 상태 코드와 에러 응답 DTO로 바꾼다.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // service에서 던진 업무 규칙 위반 (예: ER002 출발지 = 도착지)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        return toResponse(e.getErrorCode());
    }

    // 필수 파라미터가 아예 없음 (예: ?departureAirport=FUK 만 보냄) → ER001
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingParam(MissingServletRequestParameterException e) {
        return toResponse(ErrorCode.ER001);
    }

    // controller 파라미터 검사(@Pattern 등) 실패 (예: fuk, ABCD) → ER001
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(HandlerMethodValidationException e) {
        return toResponse(ErrorCode.ER001);
    }

    private ResponseEntity<ErrorResponse> toResponse(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getStatus())
            .body(new ErrorResponse(errorCode));
    }
}
