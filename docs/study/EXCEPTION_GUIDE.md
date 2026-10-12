# 예외 처리 참고서

> 코드 안의 【번호】와 이 문서의 번호가 같다. 번호를 따라가면 에러가 어떻게 넘어가는지 보인다.

## 0. 한 줄 요약

**검사하는 곳은 2군데(컨트롤러 / 서비스), 받는 곳은 1군데(GlobalExceptionHandler).**

---

## 1. 등장인물 4개

| 번호 | 클래스 | 한국어로 | 하는 일 | 파일 |
|---|---|---|---|---|
| 【1】 | `ErrorCode` | 위반 번호 목록 | 번호마다 상태 코드(400 등)와 메시지를 묶어 둠 | `common/exception/ErrorCode.java` |
| 【4】 | `BusinessException` | 위반 신고서 | 위반 번호를 담아서 위로 넘김 (검사는 if 문이 함) | `common/exception/BusinessException.java` |
| 【5】 | `GlobalExceptionHandler` | 전체 에러 접수 창구 | 신고서를 받아서 번호를 정하고 응답을 만듦 | `common/exception/GlobalExceptionHandler.java` |
| 【8】 | `ErrorResponse` | 손님에게 보내는 안내문 | `{"code": ..., "message": ...}` JSON | `common/exception/ErrorResponse.java` |

---

## 2. 흐름 ① ER002 — 내가 던지는 에러 (업무 규칙)

요청: `/api/flights?departureAirport=FUK&arrivalAirport=FUK`

| 번호 | 어디서 | 코드 | 무슨 일 |
|---|---|---|---|
| 【1】 | `ErrorCode` | `ER002(HttpStatus.BAD_REQUEST, "出発地と到着地が同じです。")` | 미리 번호·상태 코드·메시지를 정해 둠 |
| 【2】 | `FlightService` | `if (departureAirport.equals(arrivalAirport))` | 업무 규칙 검사. 같으면 걸림 |
| 【3】 | `FlightService` | `throw new BusinessException(ErrorCode.ER002)` | 신고서를 만들어 위로 던짐. 아래 DB 조회는 실행 안 됨 |
| 【4】 | `BusinessException` | `this.errorCode = errorCode` | 신고서 안에 ER002를 적어 둠 |
| ↓ | `FlightController` | (아무것도 안 함) | 예외가 컨트롤러를 그냥 통과해 위로 올라감 |
| 【5】 | `GlobalExceptionHandler` | `@ExceptionHandler(BusinessException.class)` | "BusinessException은 내가 받는다" → `handleBusiness` 실행 |
| 【6】 | `GlobalExceptionHandler` | `e.getErrorCode()` | 신고서에서 ER002를 꺼냄 |
| 【7】 | `GlobalExceptionHandler` | `ResponseEntity.status(errorCode.getStatus())` | 상태 코드 400을 정함 |
| 【8】 | `ErrorResponse` | `new ErrorResponse(errorCode)` | code = `"ER002"`, message = `"出発地と到着地が同じです。"` |
| 【9】 | 브라우저 | — | `400 {"code":"ER002","message":"出発地と到着地が同じです。"}` |

---

## 3. 흐름 ② ER001 — 스프링이 던지는 에러 (입력값 모양)

요청: `/api/flights?departureAirport=fuk&arrivalAirport=HND`

| 번호 | 어디서 | 코드 | 무슨 일 |
|---|---|---|---|
| 【A1】 | `FlightController` | `@Pattern(regexp = "^[A-Z]{3}$")` | 스프링이 대문자 3글자인지 검사. `fuk`이라 걸림. 컨트롤러 메서드는 실행조차 안 됨 |
| 【A2】 | 스프링 | `HandlerMethodValidationException` | 스프링이 만든 신고서를 던짐. **위반 번호는 안 적혀 있음** |
| 【A2】 | `GlobalExceptionHandler` | `@ExceptionHandler(HandlerMethodValidationException.class)` | "이 신고서는 내가 받는다" → `handleValidation` 실행 |
| 【A3】 | `GlobalExceptionHandler` | `toResponse(ErrorCode.ER001)` | 번호가 없으니 **창구가 직접 ER001을 붙임** |
| 【7】~【9】 | | | 여기부터는 ER002와 똑같음 → `400 {"code":"ER001", ...}` |

파라미터가 아예 없을 때(`?departureAirport=FUK`만 보냄)는 `MissingServletRequestParameterException` → `handleMissingParam` → ER001. 흐름은 위와 같다.

---

## 4. 두 흐름 비교

| | 입력값 모양 검사 (ER001) | 업무 규칙 검사 (ER002) |
|---|---|---|
| 예시 | 빈 값, 소문자 `fuk`, 4글자 `ABCD` | 출발지 = 도착지, 이미 예약된 좌석 |
| 누구의 규칙 | 어느 프로젝트에나 있는 흔한 규칙 | 이 프로젝트만의 규칙 |
| 검사하는 곳 | 컨트롤러 | 서비스, 도메인 |
| 검사 방법 | `@Pattern`, `@RequestParam` (스프링이 검사) | 내가 쓴 `if` 문 |
| 신고서 | 스프링이 만든 신고서 | `BusinessException` (내가 만든 신고서) |
| 위반 번호 | 없음 → 핸들러가 붙임 `toResponse(ErrorCode.ER001)` | 신고서 안에 있음 → 꺼내서 씀 `e.getErrorCode()` |

---

## 5. 클래스별 상세

### 【1】 ErrorCode — 위반 번호 목록

```java
ER001(HttpStatus.BAD_REQUEST, "出発地・到着地を選択してください。"),
ER002(HttpStatus.BAD_REQUEST, "出発地と到着地が同じです。");
```

- `enum`이라서 여기 적어 둔 것(ER001, ER002)만 존재한다. `new`로 새로 만들 수 없다.
- `getStatus()` → 【7】에서 상태 코드를 꺼낼 때
- `getMessage()` → 【4】, 【8】에서 메시지를 꺼낼 때
- `name()` → enum이 기본으로 가진 메서드. `"ER002"` 글자를 돌려줌 (【8】에서 사용)

### 【4】 BusinessException — 위반 신고서

```java
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
```

- `extends RuntimeException` → 이게 있어야 `throw`로 던질 수 있다.
- `super(...)` → 부모(RuntimeException)에게 메시지를 넘김. 로그에 찍힐 때 쓰임.
- 검사는 하지 않는다. 검사는 서비스의 `if` 문이 한다. 신고서는 "위반이다"라고 알리기만 한다.
- 서비스뿐 아니라 도메인(엔티티) 안에서도 던질 수 있다. (예: 나중에 `slot.reserve()`)

### 【5】 GlobalExceptionHandler — 전체 에러 접수 창구

| 표시 | 붙는 곳 | 뜻 |
|---|---|---|
| `@RestControllerAdvice` | 클래스 위 | 모든 컨트롤러의 에러를 받는다 (전역) |
| `@ExceptionHandler(○○.class)` | 메서드 위 | ○○ 신고서는 이 메서드가 받는다 |

- 하는 일 2가지: ① 어떤 에러 코드로 할지 정하기 ② 안내문(ErrorResponse) 만들어서 응답하기
- 스프링은 **메서드 이름이 아니라 `@ExceptionHandler` 표시**를 본다. `handleBusiness` 같은 이름은 우리가 지은 것이라 바꿔도 동작한다.
- `toResponse`는 세 메서드가 같이 쓰는 도우미. 같은 코드를 세 번 쓰지 않으려고 뺐다.

```
ResponseEntity                 ← 【9】 브라우저가 받는 최종 응답
├─ status : 400               ← 【7】 errorCode.getStatus()
└─ body   : ErrorResponse     ← 【8】 new ErrorResponse(errorCode)
             ├─ code    : "ER001"
             └─ message : "出発地・到着地を選択してください。"
```

### 【8】 ErrorResponse — 손님에게 보내는 안내문

```java
this.code = errorCode.name();          // "ER002"
this.message = errorCode.getMessage(); // "出発地と到着地が同じです。"
```

- getter 1개 = JSON 항목 1개. `getCode()` → `"code"`, `getMessage()` → `"message"`
- ErrorCode(enum)를 그대로 내보내지 않고 이걸 쓰는 이유: 밖에 보여 줄 모양을 따로 정해 두려고. (FlightResponse와 같은 이유)

---

## 6. 알아야 할 이름 vs 몰라도 되는 이름

**스프링이 정한 이름 (알아야 함)**

| 이름 | 무엇 |
|---|---|
| `@RestControllerAdvice` | 전체 에러 접수 창구라는 표시 |
| `@ExceptionHandler(○○.class)` | ○○ 신고서는 이 메서드가 받는다는 표시 |
| `throw` | 신고서를 위로 넘기는 자바 문법 |
| `ResponseEntity.status(...).body(...)` | 상태 코드 + 내용을 담아 응답 |

**스프링 신고서 (로그에서 보면 알아보는 정도)**

| 이름 | 언제 나오나 |
|---|---|
| `MissingServletRequestParameterException` | 필수 파라미터가 아예 없을 때 |
| `HandlerMethodValidationException` | `@Pattern` 같은 검사에 걸렸을 때 |

**우리가 지은 이름 (외울 필요 없음, 역할만 기억)**

`ErrorCode`, `BusinessException`, `ErrorResponse`, `GlobalExceptionHandler`, `handleBusiness`, `handleMissingParam`, `handleValidation`, `toResponse`

---

## 7. 주의할 점

- 컨트롤러 클래스에 `@Validated`를 붙이지 않는다. 붙이면 `ConstraintViolationException`이 나와서 핸들러가 못 받고 500이 된다. (Spring Boot 3.2 이상)
- 컨트롤러에 try-catch를 쓰지 않는다. 예외는 컨트롤러를 통과해 핸들러까지 알아서 올라간다.
