# 용어집 (用語集)

이 프로젝트에 나오는 용어를 모아, 업무에서 동료와 말할 때 바로 쓸 수 있게 정리한다.
새 용어가 나오면 같은 형식으로 해당 카테고리 맨 아래에 추가한다.

```
### 번호. 한국어 (日本語)
- 생김새 : 이 용어를 알아볼 수 있는 코드 모양
- 하는 일 : 쉬운 말로 한두 문장
- 우리 코드 : 실제 파일과 위치
- 업무에서 이렇게 말함 : 「일본 현장 표현 1개」
```

- 파일 경로의 기준 : `src/main/java/com/hoshimoto/lovemyself/` 아래. (설정 파일은 프로젝트 루트 기준)
- 예전 연습 코드 : `facility/`, `reservation/`(Slot), `common/config/DataInitializer.java`, Thymeleaf 화면은 낙관적 락을 연습할 때 만든 코드다. 항공 프로젝트와는 따로 있다.

---

## 목차

**1. Java 문법**
J01 클래스 · J02 인터페이스 · J03 열거형(enum) · J04 필드 · J05 생성자 · J06 기본 생성자 · J07 매개변수 · J08 반환 타입 · J09 접근 제어자 · J10 final · J11 static · J12 상수 · J13 정적 팩토리 메서드 · J14 this · J15 상속 · J16 super · J17 제네릭 · J18 List · J19 어노테이션 · J20 getter · J21 헬퍼 메서드 · J22 예외 · J23 RuntimeException · J24 IllegalStateException / IllegalArgumentException · J25 throw · J26 try-catch · J27 람다 · J28 메서드 참조 · J29 스트림 · J30 Optional · J31 equals · J32 정규식 · J33 LocalDate / LocalDateTime · J34 package / import · J35 JavaDoc

**2. Spring 어노테이션·클래스**
S01 @SpringBootApplication · S02 빈 / @Bean · S03 @Configuration · S04 생성자 주입(DI) · S05 @Service · S06 @RestController · S07 @Controller · S08 @RequestMapping · S09 @GetMapping · S10 @PostMapping · S11 @RequestParam · S12 @PathVariable · S13 ResponseEntity · S14 @Transactional · S15 @RestControllerAdvice · S16 @ExceptionHandler · S17 @Pattern · S18 @Validated · S19 HandlerMethodValidationException · S20 MissingServletRequestParameterException · S21 CommandLineRunner · S22 Model · S23 @SpringBootTest / @Test

**3. 아키텍처·설계**
A01 도메인 단위 패키지 · A02 레이어 · A03 컨트롤러 · A04 서비스 · A05 리포지토리 · A06 엔티티 · A07 DTO · A08 유스케이스 · A09 인터페이스 어댑터 · A10 데이터베이스 게이트웨이 · A11 업무 규칙 · A12 ID로 참조 · A13 한 방향 호출 · A14 공통 예외 처리 · A15 에러 코드

**4. DB·JPA**
D01 JPA · D02 Hibernate · D03 Spring Data JPA · D04 JpaRepository · D05 기본 메서드(findById / save) · D06 @Entity · D07 @Table · D08 @Id / PK · D09 FK · D10 @GeneratedValue(채번) · D11 @Column · D12 @Enumerated · D13 @ManyToOne / @JoinColumn · D14 지연 로딩(LAZY) · D15 @Version(낙관적 락) · D16 감사 필드 · D17 JPQL / @Query · D18 @Param · D19 메서드 이름 쿼리 · D20 트랜잭션 · D21 ddl-auto

**5. 빌드·설정**
B01 Maven / pom.xml · B02 의존성 · B03 스타터 · B04 Lombok · B05 application.yml · B06 datasource · B07 show-sql · B08 Docker Compose · B09 포트

**6. HTTP·API**
H01 API / 엔드포인트 · H02 HTTP 메서드 · H03 요청 / 응답 · H04 상태 코드 · H05 쿼리 파라미터 · H06 경로 변수 · H07 JSON · H08 직렬화(Jackson)

**7. 헷갈리는 용어 비교 표**

---

## 1. Java 문법

### J01. 클래스 (クラス)
- 생김새 :
```java
public class FlightService { ... }
```
  → `class` 뒤에 이름이 오면 클래스다. 파일 이름과 `public class` 이름은 대소문자까지 같아야 한다.
- 하는 일 : 클래스는 객체를 만드는 설계도다. 클래스는 값(필드)과 동작(메서드)을 한 덩어리로 묶는다.
- 우리 코드 : `flight/service/FlightService.java` 등 `.java` 파일 하나에 클래스 하나
- 업무에서 이렇게 말함 : 「このクラスの責務は何ですか」

### J02. 인터페이스 (インターフェース)
- 생김새 :
```java
public interface FlightRepository extends JpaRepository<Flight, Long> { ... }
```
  → `class` 대신 `interface`라고 쓰고, 메서드에 `{ }` 내용이 없다.
- 하는 일 : 인터페이스는 "이런 메서드가 있다"는 약속만 적어 둔다. 우리 프로젝트에서는 스프링이 인터페이스를 보고 실제 동작하는 코드(구현체)를 자동으로 만든다.
- 우리 코드 : `flight/repository/FlightRepository.java`, `airport/repository/AirportRepository.java`
- 업무에서 이렇게 말함 : 「インターフェースだけ定義すれば、実装はSpringが自動生成します」

### J03. 열거형 enum (列挙型)
- 생김새 :
```java
public enum ErrorCode {
    ER001(HttpStatus.BAD_REQUEST, "..."),
    ER002(HttpStatus.BAD_REQUEST, "...");
}
```
  → `enum` 키워드 + 대문자 이름 목록
- 하는 일 : enum은 정해진 값 몇 개만 존재하게 만든다. 개발자는 `new`로 새 값을 만들 수 없고, 적어 둔 값(ER001, ER002)만 쓸 수 있다.
- 우리 코드 : `common/exception/ErrorCode.java`, `member/domain/Gender.java`, `member/domain/MemberGrade.java`
- 업무에서 이렇게 말함 : 「区分値はEnumで定義しましょう」

### J04. 필드 (フィールド)
- 생김새 :
```java
private final String code;
```
  → 클래스 안, 메서드 밖에 선언한 변수
- 하는 일 : 필드는 객체가 들고 있는 값이다. 객체 하나가 만들어지면 필드도 그 객체 안에 하나씩 생긴다.
- 우리 코드 : `common/exception/ErrorResponse.java` 의 `code`, `message`
- 업무에서 이렇게 말함 : 「フィールドは基本privateにしてください」

### J05. 생성자 (コンストラクタ)
- 생김새 :
```java
public ErrorResponse(ErrorCode errorCode) {
    this.code = errorCode.name();
    this.message = errorCode.getMessage();
}
```
  → 이름이 클래스 이름과 같고, 반환 타입이 없다.
- 하는 일 : 생성자는 `new`로 객체를 만들 때 딱 한 번 실행된다. 생성자는 받은 값으로 필드를 채운다.
- 우리 코드 : `common/exception/ErrorResponse.java`, `flight/dto/FlightResponse.java`
- 업무에서 이렇게 말함 : 「必要な値はコンストラクタで受け取るようにしてください」

### J06. 기본 생성자 (デフォルトコンストラクタ)
- 생김새 :
```java
protected Flight(){}
```
  → 매개변수도 내용도 없는 생성자
- 하는 일 : JPA는 DB에서 꺼낸 값을 담을 빈 객체를 먼저 만들어야 한다. 그래서 엔티티에는 기본 생성자가 꼭 필요하다. `protected`로 두면 다른 개발자가 함부로 빈 객체를 만들 수 없다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`, `member/domain/Member.java`
- 업무에서 이렇게 말함 : 「JPA用にprotectedのデフォルトコンストラクタを用意します」

### J07. 매개변수 (引数)
- 생김새 :
```java
public List<FlightResponse> searchFlights(String departureAirport, String arrivalAirport)
```
  → 메서드 이름 뒤 `( )` 안에 적은 `타입 이름`
- 하는 일 : 매개변수는 메서드가 밖에서 받는 값을 담는 칸이다. 메서드를 부르는 쪽이 이 칸에 값을 넣어 준다.
- 우리 코드 : `flight/service/FlightService.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「このメソッドの引数は出発地と到着地の2つです」

### J08. 반환 타입 (戻り値の型)
- 생김새 :
```java
public List<FlightResponse> searchFlights(...)
//     ↑ 반환 타입
```
  → 메서드 이름 바로 앞. 아무것도 안 돌려주면 `void`
- 하는 일 : 반환 타입은 메서드가 끝날 때 돌려주는 값의 종류를 정한다. `return`하는 값은 반환 타입과 맞아야 한다.
- 우리 코드 : `flight/service/FlightService.java` 의 `List<FlightResponse>`, `reservation/domain/Slot.java` 의 `void reserve`
- 업무에서 이렇게 말함 : 「戻り値はList<FlightResponse>で返します」

### J09. 접근 제어자 (アクセス修飾子)
- 생김새 :
```java
public class ...      // 어디서나 사용 가능
protected Flight(){}  // 같은 패키지와 자식 클래스만
private final String code;  // 같은 클래스 안에서만
```
- 하는 일 : 접근 제어자는 "누가 이걸 쓸 수 있는지"를 정한다. 필드는 `private`으로 숨기고, 밖에서 쓸 메서드만 `public`으로 연다.
- 우리 코드 : 모든 클래스. 예: `common/exception/GlobalExceptionHandler.java` 의 `private ... toResponse`
- 업무에서 이렇게 말함 : 「外から呼ばないメソッドはprivateにしてください」

### J10. final (final修飾子)
- 생김새 :
```java
private final ErrorCode errorCode;
```
- 하는 일 : `final`이 붙은 필드는 생성자에서 한 번 값을 넣으면 다시 바꿀 수 없다. 개발자가 바꾸려고 하면 컴파일 에러가 난다.
- 우리 코드 : `flight/dto/FlightResponse.java` 의 모든 필드, 서비스의 `private final FlightRepository flightRepository`
- 업무에서 이렇게 말함 : 「DTOのフィールドはfinalにして不変にします」

### J11. static (static / 静的)
- 생김새 :
```java
public static void main(String[] args) { ... }
```
  → `static`이 붙은 메서드는 `클래스이름.메서드()`로 부른다.
- 하는 일 : `static`이 붙은 것은 객체가 아니라 클래스에 하나만 존재한다. 그래서 개발자는 `new` 없이 바로 쓸 수 있다.
- 우리 코드 : `LoveMyselfApplication.java` 의 `main`, `member/domain/Member.java` 의 `register`
- 업무에서 이렇게 말함 : 「staticメソッドなのでインスタンス化せずに呼べます」

### J12. 상수 (定数)
- 생김새 :
```java
private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("MM/dd HH:mm");
```
  → `static final` + 대문자 이름
- 하는 일 : 상수는 프로그램이 도는 동안 바뀌지 않는 값이다. 같은 값을 여러 곳에서 쓸 때 한 곳에 정해 둔다.
- 우리 코드 : `reservation/controller/ReservationController.java` 의 `FMT`
- 업무에서 이렇게 말함 : 「マジックナンバーは定数に切り出してください」

### J13. 정적 팩토리 메서드 (ファクトリメソッド)
- 생김새 :
```java
public static Member register(String nameKanji, ...) {
    Member member = new Member();
    ...
    return member;
}
```
  → `static` + 자기 클래스 타입을 돌려주는 메서드
- 하는 일 : 정적 팩토리 메서드는 생성자 대신 이름 있는 메서드로 객체를 만든다. 이름(`register`)만 보고도 "회원 가입으로 만든 회원"이라는 뜻을 알 수 있다.
- 우리 코드 : `member/domain/Member.java` 의 `register` (등급은 `REGULAR`, 삭제 여부는 `false`로 시작)
- 업무에서 이렇게 말함 : 「生成はファクトリメソッド経由にして、初期値をエンティティ側で決めます」

### J14. this (this)
- 생김새 :
```java
this.errorCode = errorCode;
```
- 하는 일 : `this`는 "지금 이 객체 자신"을 가리킨다. 위 코드에서 왼쪽 `this.errorCode`는 필드이고, 오른쪽 `errorCode`는 매개변수다.
- 우리 코드 : `common/exception/BusinessException.java` 생성자, 모든 DTO 생성자
- 업무에서 이렇게 말함 : 「フィールドと引数の名前が同じなのでthisで区別しています」

### J15. 상속 (継承)
- 생김새 :
```java
public class BusinessException extends RuntimeException { ... }
```
  → `extends 부모클래스`
- 하는 일 : 상속받은 클래스(자식)는 부모 클래스의 기능을 그대로 물려받는다. `BusinessException`은 `RuntimeException`을 물려받았기 때문에 `throw`로 던질 수 있다.
- 우리 코드 : `common/exception/BusinessException.java`
- 업무에서 이렇게 말함 : 「RuntimeExceptionを継承して独自例外を作ります」

### J16. super (super)
- 생김새 :
```java
super(errorCode.getMessage());
```
  → 생성자 안 첫 줄의 `super(...)`
- 하는 일 : `super(...)`는 부모 클래스의 생성자를 부른다. 우리 코드에서는 메시지를 부모(`RuntimeException`)에게 넘겨서 `e.getMessage()`로 꺼낼 수 있게 한다.
- 우리 코드 : `common/exception/BusinessException.java` 생성자
- 업무에서 이렇게 말함 : 「superで親クラスのコンストラクタにメッセージを渡しています」

### J17. 제네릭 (ジェネリクス)
- 생김새 :
```java
List<FlightResponse>
ResponseEntity<ErrorResponse>
JpaRepository<Flight, Long>
```
  → `< >` 안에 타입을 적는다.
- 하는 일 : 제네릭은 "안에 무엇이 들었는지"를 타입으로 정한다. `List<FlightResponse>`는 "FlightResponse만 들어 있는 리스트"라는 뜻이다.
- 우리 코드 : `flight/repository/FlightRepository.java` 의 `JpaRepository<Flight, Long>` (다룰 엔티티, ID 타입)
- 업무에서 이렇게 말함 : 「ジェネリクスで型を指定しておけばキャストが不要です」

### J18. List (リスト)
- 생김새 :
```java
List<Flight> flights = flightRepository.searchFlights(...);
```
- 하는 일 : List는 값 여러 개를 순서대로 담는 상자다. 검색 결과가 0건이면 List는 비어 있는 상태로 온다(`null`이 아니다).
- 우리 코드 : `flight/service/FlightService.java`, `airport/service/AirportService.java`
- 업무에서 이렇게 말함 : 「0件の場合はnullではなく空リストを返します」

### J19. 어노테이션 (アノテーション)
- 생김새 :
```java
@Service
@Transactional(readOnly = true)
```
  → `@` + 이름
- 하는 일 : 어노테이션은 코드에 붙이는 표시다. 스프링은 이 표시를 읽고 "이 클래스는 서비스구나", "이 메서드는 트랜잭션 안에서 돌리자"처럼 대신 일을 해 준다.
- 우리 코드 : 모든 클래스. 예: `flight/service/FlightService.java`
- 업무에서 이렇게 말함 : 「アノテーションを付ければSpringが自動で処理してくれます」

### J20. getter (ゲッター)
- 생김새 :
```java
public String getCode() { return code; }
public boolean isReserved() { return reserved; }   // boolean은 is~
```
- 하는 일 : getter는 `private` 필드 값을 밖에서 읽을 수 있게 해 준다. 값을 바꾸는 setter는 일부러 만들지 않는다.
- 우리 코드 : `common/exception/ErrorResponse.java`, `reservation/dto/SlotDto.java` 의 `isReserved`
- 업무에서 이렇게 말함 : 「Setterは作らず、Getterだけ公開します」

### J21. 헬퍼 메서드 (ヘルパーメソッド)
- 생김새 :
```java
private ResponseEntity<ErrorResponse> toResponse(ErrorCode errorCode) { ... }
```
  → 이런 모양이면 헬퍼 메서드라고 부른다: `private` / 같은 클래스 안에서만 호출 / 공통 작업을 묶어 둠
- 하는 일 : 헬퍼 메서드는 여러 메서드가 반복하는 작업을 한 곳에 모아 둔 도우미다.
- 우리 코드 : `common/exception/GlobalExceptionHandler.java` 의 `toResponse` — 핸들러 3개가 공통으로 호출. `reservation/controller/ReservationController.java` 의 `toDto`
- 업무에서 이렇게 말함 : 「共通処理をヘルパーメソッドに切り出す」

### J22. 예외 (例外)
- 생김새 :
```java
throw new BusinessException(ErrorCode.ER002);
```
  → 이름이 `~Exception`으로 끝나는 클래스
- 하는 일 : 예외는 "정상적으로 진행할 수 없다"는 신호다. 예외가 던져지면 아래 코드는 실행되지 않고, 예외를 받는 곳까지 위로 올라간다.
- 우리 코드 : `common/exception/` 폴더 전체, `flight/service/FlightService.java`
- 업무에서 이렇게 말함 : 「業務エラーは例外で上位に通知します」

### J23. RuntimeException (非検査例外)
- 생김새 :
```java
public class BusinessException extends RuntimeException
```
- 하는 일 : `RuntimeException`을 물려받은 예외는 `try-catch`나 `throws` 선언 없이 바로 던질 수 있다. 그래서 서비스는 던지기만 하고 처리는 핸들러에 맡길 수 있다.
- 우리 코드 : `common/exception/BusinessException.java`
- 업무에서 이렇게 말함 : 「業務例外は非検査例外(RuntimeException)で定義しています」

### J24. IllegalStateException / IllegalArgumentException (不正状態例外 / 不正引数例外)
- 생김새 :
```java
throw new IllegalStateException("既に予約した「施設」です。");
throw new IllegalArgumentException("存在してないスロットです。");
```
- 하는 일 : 두 예외는 자바가 미리 만들어 둔 예외다. `IllegalStateException`은 "지금 상태로는 안 된다", `IllegalArgumentException`은 "받은 값이 잘못됐다"는 뜻이다.
- 우리 코드 : `reservation/domain/Slot.java` 의 `reserve`, `reservation/service/ReservationService.java` (연습 코드. 항공 쪽은 `BusinessException`을 쓴다)
- 업무에서 이렇게 말함 : 「引数がおかしい場合はIllegalArgumentExceptionを投げます」

### J25. throw (例外をスローする)
- 생김새 :
```java
throw new BusinessException(ErrorCode.ER002);
```
- 하는 일 : `throw`는 예외 객체를 위로 던진다. `throw` 아래 줄은 실행되지 않는다.
- 우리 코드 : `flight/service/FlightService.java` 의 `searchFlights` 맨 앞
- 업무에서 이렇게 말함 : 「出発地と到着地が同じならBusinessExceptionをスローします」

### J26. try-catch (例外を捕捉する)
- 생김새 :
```java
try {
    slot.reserve(userId);
    slotRepository.save(slot);
} catch (ObjectOptimisticLockingFailureException e) {
    throw new IllegalStateException("...");
}
```
- 하는 일 : `try` 안에서 예외가 나면 `catch`가 받는다. `catch`는 받은 예외를 다른 예외로 바꾸거나 처리할 수 있다.
- 우리 코드 : `reservation/service/ReservationService.java` 의 `reserveSlot` (항공 쪽은 `GlobalExceptionHandler`가 받기 때문에 try-catch가 없다)
- 업무에서 이렇게 말함 : 「楽観ロック例外をcatchして業務メッセージに変換しています」

### J27. 람다 (ラムダ式)
- 생김새 :
```java
.map(flight -> new FlightResponse(...))
```
  → `입력 -> 결과`
- 하는 일 : 람다는 이름 없는 짧은 메서드다. 위 코드는 "flight 하나를 받아서 FlightResponse로 바꾼다"는 뜻이다.
- 우리 코드 : `flight/service/FlightService.java`, `airport/service/AirportService.java` 의 `.map(...)`
- 업무에서 이렇게 말함 : 「ラムダ式でエンティティをDTOに変換しています」

### J28. 메서드 참조 (メソッド参照)
- 생김새 :
```java
.map(this::toDto)
```
  → `누구::메서드이름`
- 하는 일 : 메서드 참조는 람다를 더 짧게 쓴 것이다. `this::toDto`는 `slot -> this.toDto(slot)`과 같다.
- 우리 코드 : `reservation/controller/ReservationController.java` 의 `getSlots`
- 업무에서 이렇게 말함 : 「メソッド参照で書くとすっきりします」

### J29. 스트림 (Stream API)
- 생김새 :
```java
flights.stream()
    .map(flight -> new FlightResponse(...))
    .toList();
```
- 하는 일 : 스트림은 리스트의 값을 하나씩 꺼내서 바꾸고 다시 모은다. `stream()`으로 꺼내고, `map`으로 바꾸고, `toList()`로 모은다.
- 우리 코드 : `flight/service/FlightService.java`, `airport/service/AirportService.java`
- 업무에서 이렇게 말함 : 「Stream APIでList<Entity>をList<DTO>に詰め替えます」

### J30. Optional (Optional)
- 생김새 :
```java
slotRepository.findById(slotId)
    .orElseThrow(() -> new IllegalArgumentException("存在してないスロットです。"));
```
- 하는 일 : Optional은 "값이 있을 수도, 없을 수도 있는 상자"다. `orElseThrow`는 값이 없으면 예외를 던지고, 있으면 꺼내 준다.
- 우리 코드 : `reservation/service/ReservationService.java` 의 `reserveSlot`, `cancelReserveSlot`
- 업무에서 이렇게 말함 : 「findByIdはOptionalで返るので、orElseThrowで存在チェックします」

### J31. equals (equals / 等価比較)
- 생김새 :
```java
departureAirport.equals(arrivalAirport)
```
- 하는 일 : `equals`는 두 문자열의 내용이 같은지 비교한다. 자바에서 문자열 내용을 비교할 때는 `==`가 아니라 `equals`를 쓴다.
- 우리 코드 : `flight/service/FlightService.java` 의 ER002 검사, `reservation/service/ReservationService.java` 의 `cancelReserveSlot`
- 업무에서 이렇게 말함 : 「文字列比較は==ではなくequalsを使ってください」

### J32. 정규식 (正規表現)
- 생김새 :
```java
@Pattern(regexp = "^[A-Z]{3}$")
```
- 하는 일 : 정규식은 글자 모양의 규칙이다. `^[A-Z]{3}$`는 "처음부터 끝까지 영어 대문자 정확히 3글자"라는 뜻이다.
- 우리 코드 : `flight/controller/FlightController.java` 의 `searchFlights` 매개변수
- 업무에서 이렇게 말함 : 「空港コードは正規表現で英大文字3桁をチェックしています」

### J33. LocalDate / LocalDateTime (日付型 / 日時型)
- 생김새 :
```java
private LocalDateTime departureAt;   // 2026-10-01T09:00
private LocalDate birthDate;         // 1996-07-01
```
- 하는 일 : `LocalDate`는 날짜만, `LocalDateTime`은 날짜와 시각을 담는다. `LocalDateTime.now()`는 지금 일시를 만든다.
- 우리 코드 : `flight/domain/Flight.java`, `member/domain/Member.java`, `flight/service/FlightService.java` 의 `LocalDateTime.now()`
- 업무에서 이렇게 말함 : 「現在日時はServiceで取得してRepositoryに渡します」

### J34. package / import (パッケージ / インポート)
- 생김새 :
```java
package com.hoshimoto.lovemyself.flight.service;
import com.hoshimoto.lovemyself.common.exception.ErrorCode;
```
- 하는 일 : `package`는 이 파일이 어느 폴더에 속하는지 적는다. `import`는 다른 폴더의 클래스를 가져와 쓰겠다고 적는다.
- 우리 코드 : 모든 `.java` 파일 맨 위
- 업무에서 이렇게 말함 : 「他ドメインのrepositoryはimportしないルールです」

### J35. JavaDoc (Javadoc)
- 생김새 :
```java
/**
 * 클린 아키텍처 20장 "유스케이스": 항공편 검색 흐름을 조율하고, ...
 */
```
  → `/**` 로 시작하는 주석
- 하는 일 : JavaDoc은 클래스나 메서드 위에 다는 설명서다. 우리 프로젝트는 클린 아키텍처 몇 장이 적용됐는지를 JavaDoc에 한 줄로 쓴다.
- 우리 코드 : `flight/service/FlightService.java` 등 클래스 맨 위
- 업무에서 이렇게 말함 : 「クラスの役割はJavadocに一行で書いてください」

---

## 2. Spring 어노테이션·클래스

### S01. @SpringBootApplication (@SpringBootApplication)
- 생김새 :
```java
@SpringBootApplication
public class LoveMyselfApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoveMyselfApplication.class, args);
    }
}
```
- 하는 일 : `@SpringBootApplication`이 붙은 클래스가 앱의 시작점이다. 스프링은 이 클래스가 있는 패키지 아래를 전부 훑어서 `@Service`, `@RestController` 등을 찾아 등록한다.
- 우리 코드 : `LoveMyselfApplication.java`
- 업무에서 이렇게 말함 : 「起動クラスより下のパッケージに置かないとスキャンされません」

### S02. 빈 / @Bean (Bean)
- 생김새 :
```java
@Bean
public CommandLineRunner initData(...) { ... }
```
- 하는 일 : 빈은 스프링이 만들어서 관리하는 객체다. `@Service`, `@RestController`가 붙은 클래스도 스프링이 빈으로 만든다. `@Bean`은 메서드가 돌려주는 객체를 빈으로 등록한다.
- 우리 코드 : `common/config/DataInitializer.java` 의 `initData`
- 업무에서 이렇게 말함 : 「このクラスはBeanとして登録されていますか」

### S03. @Configuration (@Configuration)
- 생김새 :
```java
@Configuration
public class DataInitializer { ... }
```
- 하는 일 : `@Configuration`은 "이 클래스는 설정용이다"라는 표시다. 스프링은 이 클래스 안의 `@Bean` 메서드를 실행해서 빈을 등록한다.
- 우리 코드 : `common/config/DataInitializer.java`
- 업무에서 이렇게 말함 : 「設定クラスは@Configurationを付けてconfigパッケージに置きます」

### S04. 생성자 주입 DI (コンストラクタインジェクション)
- 생김새 :
```java
private final FlightRepository flightRepository;

public FlightService(FlightRepository flightRepository) {
    this.flightRepository = flightRepository;
}
```
  → `new`를 쓰지 않고 생성자 매개변수로 받는다.
- 하는 일 : 스프링은 생성자에 필요한 빈을 찾아서 자동으로 넣어 준다. 개발자는 `new FlightRepository()`를 직접 쓰지 않는다.
- 우리 코드 : `flight/service/FlightService.java`, `flight/controller/FlightController.java` 등 모든 서비스·컨트롤러
- 업무에서 이렇게 말함 : 「依存はコンストラクタインジェクションで受け取ります」

### S05. @Service (@Service)
- 생김새 :
```java
@Service
public class FlightService { ... }
```
- 하는 일 : `@Service`는 "이 클래스는 서비스 레이어다"라는 표시다. 스프링은 이 클래스를 빈으로 만들어 컨트롤러에 넣어 준다.
- 우리 코드 : `flight/service/FlightService.java`, `airport/service/AirportService.java`
- 업무에서 이렇게 말함 : 「業務ロジックは@Serviceクラスにまとめます」

### S06. @RestController (@RestController)
- 생김새 :
```java
@RestController
@RequestMapping("/api/flights")
public class FlightController { ... }
```
- 하는 일 : `@RestController`가 붙은 클래스는 HTTP 요청을 받는다. 메서드가 돌려준 값은 화면(HTML)이 아니라 JSON으로 바뀌어 응답된다.
- 우리 코드 : `flight/controller/FlightController.java`, `airport/controller/AirportController.java`
- 업무에서 이렇게 말함 : 「APIなので@RestControllerでJSONを返します」

### S07. @Controller (@Controller)
- 생김새 :
```java
@Controller
public class ReservationViewController {
    @GetMapping("/")
    public String showSlots(Model model) { ... return "index"; }
}
```
- 하는 일 : `@Controller`가 붙은 메서드가 돌려준 문자열은 화면 파일 이름으로 쓰인다. `"index"`를 돌려주면 `templates/index.html`이 화면으로 나간다.
- 우리 코드 : `reservation/controller/ReservationViewController.java` (연습 코드)
- 업무에서 이렇게 말함 : 「画面を返すときは@Controller、データを返すときは@RestControllerです」

### S08. @RequestMapping (@RequestMapping)
- 생김새 :
```java
@RequestMapping("/api/flights")
```
  → 클래스 위에 붙음
- 하는 일 : `@RequestMapping`은 이 컨트롤러가 담당하는 주소의 앞부분을 정한다. 클래스 안 메서드들의 주소는 모두 이 주소로 시작한다.
- 우리 코드 : `flight/controller/FlightController.java`, `airport/controller/AirportController.java`
- 업무에서 이렇게 말함 : 「共通のURLはクラスの@RequestMappingにまとめます」

### S09. @GetMapping (@GetMapping)
- 생김새 :
```java
@GetMapping
public ResponseEntity<List<FlightResponse>> searchFlights(...)
```
- 하는 일 : `@GetMapping`은 "GET 요청이 오면 이 메서드를 실행한다"는 표시다. 괄호에 글자를 넣으면 주소 뒤에 그대로 붙는다.
- 우리 코드 : `flight/controller/FlightController.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「照会系はGETでマッピングします」

### S10. @PostMapping (@PostMapping)
- 생김새 :
```java
@PostMapping("/{slotId}/reserve")
```
- 하는 일 : `@PostMapping`은 "POST 요청이 오면 이 메서드를 실행한다"는 표시다. POST는 데이터를 등록하거나 바꿀 때 쓴다.
- 우리 코드 : `reservation/controller/ReservationController.java` 의 `reserve`, `cancel` (연습 코드)
- 업무에서 이렇게 말함 : 「更新系はPOSTで受けます」

### S11. @RequestParam (@RequestParam)
- 생김새 :
```java
@RequestParam String departureAirport
```
  → 주소 `?departureAirport=FUK` 의 값을 받는다.
- 하는 일 : `@RequestParam`은 주소 뒤 `?키=값`에서 값을 꺼내 매개변수에 넣는다. 기본값이 "필수"라서 값이 없으면 스프링이 `MissingServletRequestParameterException`을 던진다.
- 우리 코드 : `flight/controller/FlightController.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「検索条件はクエリパラメータで受け取ります」

### S12. @PathVariable (@PathVariable)
- 생김새 :
```java
@PostMapping("/{slotId}/reserve")
public ResponseEntity<Void> reserve(@PathVariable Long slotId, ...)
```
  → 주소 안의 `{ }` 부분
- 하는 일 : `@PathVariable`은 주소 중간에 들어 있는 값을 꺼낸다. `/api/slots/3/reserve`라면 `slotId`에 3이 들어간다.
- 우리 코드 : `reservation/controller/ReservationController.java` (연습 코드)
- 업무에서 이렇게 말함 : 「IDはパス変数で受け取ります」

### S13. ResponseEntity (ResponseEntity)
- 생김새 :
```java
return ResponseEntity.ok(flightService.searchFlights(...));
return ResponseEntity.status(errorCode.getStatus()).body(new ErrorResponse(errorCode));
```
- 하는 일 : `ResponseEntity`는 HTTP 응답 전체(상태 코드 + 본문)를 담는 상자다. `ok(...)`는 200, `status(...)`는 원하는 상태 코드로 응답한다.
- 우리 코드 : `flight/controller/FlightController.java`, `common/exception/GlobalExceptionHandler.java` 의 `toResponse`
- 업무에서 이렇게 말함 : 「ResponseEntityでステータスコードとボディを返します」

### S14. @Transactional (@Transactional)
- 생김새 :
```java
@Transactional(readOnly = true)
public List<FlightResponse> searchFlights(...)
```
- 하는 일 : `@Transactional`이 붙은 메서드는 하나의 트랜잭션 안에서 실행된다. `readOnly = true`는 "조회만 한다"는 표시다.
- 우리 코드 : `flight/service/FlightService.java`, `airport/service/AirportService.java` (조회), `reservation/service/ReservationService.java` (변경)
- 업무에서 이렇게 말함 : 「照会系はreadOnly=trueを付けてください」

### S15. @RestControllerAdvice (@RestControllerAdvice)
- 생김새 :
```java
@RestControllerAdvice
public class GlobalExceptionHandler { ... }
```
- 하는 일 : `@RestControllerAdvice`가 붙은 클래스는 모든 컨트롤러에서 올라온 예외를 받는다. 이 표시가 없으면 핸들러가 동작하지 않는다.
- 우리 코드 : `common/exception/GlobalExceptionHandler.java`
- 업무에서 이렇게 말함 : 「例外は@RestControllerAdviceで一括ハンドリングしています」

### S16. @ExceptionHandler (@ExceptionHandler)
- 생김새 :
```java
@ExceptionHandler(BusinessException.class)
public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) { ... }
```
- 하는 일 : `@ExceptionHandler(○○.class)`는 "○○ 예외는 이 메서드가 받는다"는 표시다. 스프링은 메서드 이름이 아니라 이 표시를 보고 담당 메서드를 고른다.
- 우리 코드 : `common/exception/GlobalExceptionHandler.java` 의 메서드 3개
- 업무에서 이렇게 말함 : 「この例外用の@ExceptionHandlerを追加しておきます」

### S17. @Pattern (@Pattern / Bean Validation)
- 생김새 :
```java
@RequestParam @Pattern(regexp = "^[A-Z]{3}$") String departureAirport
```
- 하는 일 : `@Pattern`은 값이 정규식 모양과 맞는지 스프링이 검사하게 한다. 모양이 틀리면 스프링이 `HandlerMethodValidationException`을 던진다.
- 우리 코드 : `flight/controller/FlightController.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「入力チェックはBean Validationのアノテーションで行います」

### S18. @Validated (@Validated)
- 생김새 :
```java
@Validated
@RestController
public class ...
```
- 하는 일 : `@Validated`는 클래스에 붙여 검사를 켜는 표시다. 하지만 Spring Boot 3.2 이상에서는 `@Validated` 없이도 컨트롤러 검사가 동작한다. 붙이면 다른 예외(`ConstraintViolationException`)가 나와서 우리 핸들러가 받지 못한다.
- 우리 코드 : 쓰지 않음. 이유는 `docs/study/EXCEPTION_GUIDE.md` 7장
- 업무에서 이렇게 말함 : 「Boot 3.2以降はコントローラに@Validatedは不要です」

### S19. HandlerMethodValidationException (HandlerMethodValidationException)
- 생김새 :
```java
@ExceptionHandler(HandlerMethodValidationException.class)
```
- 하는 일 : 이 예외는 `@Pattern` 같은 컨트롤러 매개변수 검사에 걸렸을 때 스프링이 던진다. 우리 핸들러는 이 예외를 받아 ER001로 바꾼다.
- 우리 코드 : `common/exception/GlobalExceptionHandler.java` 의 `handleValidation`
- 업무에서 이렇게 말함 : 「バリデーションエラーはER001に変換して返しています」

### S20. MissingServletRequestParameterException (MissingServletRequestParameterException)
- 생김새 :
```java
@ExceptionHandler(MissingServletRequestParameterException.class)
```
- 하는 일 : 이 예외는 필수 `@RequestParam` 값이 아예 오지 않았을 때 스프링이 던진다. 우리 핸들러는 이 예외도 ER001로 바꾼다.
- 우리 코드 : `common/exception/GlobalExceptionHandler.java` 의 `handleMissingParam`
- 업무에서 이렇게 말함 : 「必須パラメータ欠落もER001で返します」

### S21. CommandLineRunner (CommandLineRunner)
- 생김새 :
```java
@Bean
public CommandLineRunner initData(...) {
    return args -> { ... };
}
```
- 하는 일 : `CommandLineRunner` 빈은 앱이 다 켜진 직후에 한 번 실행된다. 우리 코드는 이걸로 시작할 때 테스트 데이터를 넣는다.
- 우리 코드 : `common/config/DataInitializer.java` (연습 코드)
- 업무에서 이렇게 말함 : 「起動時に初期データを投入しています」

### S22. Model (Model)
- 생김새 :
```java
public String showSlots(Model model) {
    model.addAttribute("slots", slots);
    return "index";
}
```
- 하는 일 : `Model`은 컨트롤러가 화면(Thymeleaf)에 값을 넘기는 상자다. `addAttribute("slots", ...)`로 넣으면 화면에서 `slots`라는 이름으로 꺼낸다.
- 우리 코드 : `reservation/controller/ReservationViewController.java` (연습 코드)
- 업무에서 이렇게 말함 : 「Modelに詰めて画面に渡します」

### S23. @SpringBootTest / @Test (@SpringBootTest / @Test)
- 생김새 :
```java
@SpringBootTest
class LoveMyselfApplicationTests {
    @Test
    void contextLoads() { }
}
```
- 하는 일 : `@SpringBootTest`는 테스트할 때 앱 전체를 실제로 띄운다. `@Test`가 붙은 메서드 하나가 테스트 하나다. `contextLoads`는 "앱이 에러 없이 켜지는가"만 확인한다.
- 우리 코드 : `src/test/java/com/hoshimoto/lovemyself/LoveMyselfApplicationTests.java`
- 업무에서 이렇게 말함 : 「起動確認のテストだけ通っています」

---

## 3. 아키텍처·설계

### A01. 도메인 단위 패키지 (ドメイン単位パッケージ / パッケージ・バイ・フィーチャー)
- 생김새 :
```
com.hoshimoto.lovemyself
├── airport/
├── flight/
└── common/
```
  → 최상위 폴더 이름이 기능(공항, 항공편) 이름
- 하는 일 : 도메인 단위 패키지는 폴더를 기능별로 먼저 나눈다. 그래서 개발자는 "항공편 관련 코드"를 `flight/` 한 곳에서 찾을 수 있다.
- 우리 코드 : `src/main/java/com/hoshimoto/lovemyself/` 바로 아래 폴더들, 규칙은 `docs/ARCHITECTURE.md`
- 업무에서 이렇게 말함 : 「パッケージは機能単位で切っています」

### A02. 레이어 (レイヤー / 層)
- 생김새 :
```
flight/
├── controller/
├── service/
├── repository/
├── domain/
└── dto/
```
- 하는 일 : 레이어는 역할별로 나눈 층이다. 각 도메인 폴더 안은 항상 이 5개 폴더로 나눈다.
- 우리 코드 : `flight/`, `airport/`
- 업무에서 이렇게 말함 : 「このロジックはどのレイヤーに置くべきですか」

### A03. 컨트롤러 (コントローラ)
- 생김새 :
```java
@RestController
public class FlightController { ... }
```
  → `controller/` 폴더, 이름이 `~Controller`
- 하는 일 : 컨트롤러는 HTTP 요청을 받고, 입력값 모양을 검사하고, 서비스를 불러 결과를 응답한다. 컨트롤러는 업무 판단을 하지 않는다.
- 우리 코드 : `flight/controller/FlightController.java`
- 업무에서 이렇게 말함 : 「コントローラには業務ロジックを書かないでください」

### A04. 서비스 (サービス)
- 생김새 :
```java
@Service
public class FlightService { ... }
```
  → `service/` 폴더, 이름이 `~Service`
- 하는 일 : 서비스는 기능 하나의 흐름(검사 → 조회 → 변환)을 순서대로 조율하고, 트랜잭션 범위를 정한다.
- 우리 코드 : `flight/service/FlightService.java`
- 업무에서 이렇게 말함 : 「処理の流れはサービス層で組み立てます」

### A05. 리포지토리 (リポジトリ)
- 생김새 :
```java
public interface FlightRepository extends JpaRepository<Flight, Long> { ... }
```
  → `repository/` 폴더, 이름이 `~Repository`
- 하는 일 : 리포지토리는 DB에서 데이터를 꺼내거나 저장한다. 리포지토리는 업무 판단을 하지 않는다.
- 우리 코드 : `flight/repository/FlightRepository.java`
- 업무에서 이렇게 말함 : 「他ドメインのリポジトリは直接呼ばないでください」

### A06. 엔티티 (エンティティ)
- 생김새 :
```java
@Entity
@Table(name = "flight")
public class Flight { ... }
```
  → `domain/` 폴더, `@Entity`
- 하는 일 : 엔티티는 DB 테이블 한 줄(1행)을 자바 객체로 나타낸 것이다. 엔티티는 업무 규칙과 상태 변경 메서드를 가진다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`, `member/domain/Member.java`
- 업무에서 이렇게 말함 : 「エンティティをそのまま画面に返さないでください」

### A07. DTO (DTO)
- 생김새 :
```java
public class FlightResponse {
    private final Long id;
    ...
    public Long getId() { return id; }
}
```
  → `dto/` 폴더, `final` 필드 + 생성자 + getter, 로직 없음
- 하는 일 : DTO는 데이터를 밖으로 넘기기 위한 상자다. 엔티티는 DB 쪽 모양이고, DTO는 화면 쪽에 필요한 값만 담는다.
- 우리 코드 : `flight/dto/FlightResponse.java`, `airport/dto/AirportResponse.java`, `common/exception/ErrorResponse.java`
- 업무에서 이렇게 말함 : 「レスポンスはDTOに詰め替えて返します」

### A08. 유스케이스 (ユースケース)
- 생김새 :
```java
/** 클린 아키텍처 20장 "유스케이스": 항공편 검색 흐름을 조율하고, ... */
```
- 하는 일 : 유스케이스는 "사용자가 하려는 일 하나"(예: 항공편 검색)를 처리하는 흐름이다. 우리 프로젝트에서는 서비스 메서드 하나가 유스케이스 하나다.
- 우리 코드 : `flight/service/FlightService.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「1ユースケース1メソッドで作っています」

### A09. 인터페이스 어댑터 (インターフェースアダプター)
- 생김새 :
```java
/** 클린 아키텍처 22장 "인터페이스 어댑터": ... */
```
- 하는 일 : 인터페이스 어댑터는 바깥 세계(HTTP)와 안쪽(서비스)을 이어 주는 번역기다. 요청을 서비스 호출로 바꾸고, 결과나 예외를 HTTP 응답으로 바꾼다.
- 우리 코드 : `flight/controller/FlightController.java`, `common/exception/GlobalExceptionHandler.java`
- 업무에서 이렇게 말함 : 「HTTPの事情はコントローラ側で吸収します」

### A10. 데이터베이스 게이트웨이 (データベースゲートウェイ)
- 생김새 :
```java
/** 클린 아키텍처 23장 "데이터베이스 게이트웨이": DB 접근을 인터페이스 뒤로 숨겨 ... */
```
- 하는 일 : 데이터베이스 게이트웨이는 DB에 접근하는 출입구다. 서비스는 SQL을 몰라도 리포지토리 메서드만 부르면 된다.
- 우리 코드 : `flight/repository/FlightRepository.java`, `airport/repository/AirportRepository.java`
- 업무에서 이렇게 말함 : 「DBアクセスはリポジトリに閉じ込めています」

### A11. 업무 규칙 (業務ルール / ビジネスロジック)
- 생김새 :
```java
if (departureAirport.equals(arrivalAirport)) {
    throw new BusinessException(ErrorCode.ER002);
}
```
  → 이 프로젝트만의 규칙을 검사하는 `if`
- 하는 일 : 업무 규칙은 이 서비스만의 약속(예: 출발지와 도착지는 달라야 한다)이다. 업무 규칙은 서비스나 엔티티 안에서 검사한다.
- 우리 코드 : `flight/service/FlightService.java` (ER002), `reservation/domain/Slot.java` 의 `reserve`
- 업무에서 이렇게 말함 : 「この業務ルールはドメイン側に寄せましょう」

### A12. ID로 참조 (ID参照)
- 생김새 :
```java
// airportドメインはエンティティではなく空港コードで参照する
private String departureAirport;
```
  → 다른 도메인의 엔티티 객체가 아니라 ID(코드)만 필드로 가짐
- 하는 일 : 다른 도메인은 객체 대신 ID로만 들고 있다. 그래서 `flight`는 `airport` 엔티티 클래스에 묶이지 않는다.
- 우리 코드 : `flight/domain/Flight.java` 의 `departureAirport`, `arrivalAirport`
- 업무에서 이렇게 말함 : 「他ドメインのエンティティはIDで参照します」

### A13. 한 방향 호출 (一方向の依存)
- 생김새 :
```
controller → service → repository → domain
```
- 하는 일 : 호출은 항상 위에서 아래로 한 방향이다. 리포지토리가 서비스를 부르거나, 서비스가 컨트롤러를 부르는 일은 없다.
- 우리 코드 : `docs/ARCHITECTURE.md`, `flight/` 전체
- 업무에서 이렇게 말함 : 「依存の向きが逆になっていませんか」

### A14. 공통 예외 처리 (共通例外処理)
- 생김새 :
```
common/exception/
├── ErrorCode.java
├── BusinessException.java
├── ErrorResponse.java
└── GlobalExceptionHandler.java
```
- 하는 일 : 공통 예외 처리는 모든 에러 응답을 한 곳에서 같은 모양으로 만든다. 컨트롤러와 서비스는 에러 응답 모양을 신경 쓰지 않는다.
- 우리 코드 : `common/exception/` 폴더, 흐름은 `docs/study/EXCEPTION_GUIDE.md`
- 업무에서 이렇게 말함 : 「エラーレスポンスは共通ハンドラで統一しています」

### A15. 에러 코드 (エラーコード)
- 생김새 :
```java
ER001(HttpStatus.BAD_REQUEST, "出発地・到着地を選択してください。")
```
- 하는 일 : 에러 코드는 에러 종류마다 붙인 번호다. 번호 하나에 HTTP 상태 코드와 메시지가 묶여 있어서, 메시지를 바꿀 때 한 곳만 고치면 된다.
- 우리 코드 : `common/exception/ErrorCode.java`, 목록은 `docs/specs/specs.md` 의 "共通 エラーレスポンス"
- 업무에서 이렇게 말함 : 「エラーコード一覧に新しいコードを採番してください」

---

## 4. DB·JPA

### D01. JPA (JPA)
- 생김새 :
```java
import jakarta.persistence.Entity;
```
  → `jakarta.persistence` 로 시작하는 import
- 하는 일 : JPA는 자바 객체와 DB 테이블을 연결하는 규칙(표준)이다. 개발자는 SQL 대신 엔티티 객체를 다룬다.
- 우리 코드 : 모든 엔티티(`flight/domain/Flight.java` 등)
- 업무에서 이렇게 말함 : 「永続化はJPAで行っています」

### D02. Hibernate (Hibernate)
- 생김새 :
```yaml
database-platform: org.hibernate.dialect.PostgreSQLDialect
```
- 하는 일 : Hibernate는 JPA 규칙을 실제로 실행하는 라이브러리다. Hibernate가 엔티티를 보고 SQL을 만들어 DB에 보낸다.
- 우리 코드 : `src/main/resources/application.yml` 의 `jpa` 설정
- 업무에서 이렇게 말함 : 「Hibernateが発行したSQLをログで確認してください」

### D03. Spring Data JPA (Spring Data JPA)
- 생김새 :
```xml
<artifactId>spring-boot-starter-data-jpa</artifactId>
```
- 하는 일 : Spring Data JPA는 리포지토리 인터페이스만 만들면 구현 코드를 자동으로 만들어 준다.
- 우리 코드 : `pom.xml`, 모든 `~Repository` 인터페이스
- 업무에서 이렇게 말함 : 「Spring Data JPAなのでRepositoryの実装クラスは不要です」

### D04. JpaRepository (JpaRepository)
- 생김새 :
```java
extends JpaRepository<Flight, Long>
//                    ↑엔티티 ↑ID 타입
```
- 하는 일 : `JpaRepository`를 상속하면 저장·조회·삭제 같은 기본 메서드를 바로 쓸 수 있다. 두 번째 타입은 엔티티 `@Id`의 타입과 맞아야 한다.
- 우리 코드 : `flight/repository/FlightRepository.java` (`Long`), `airport/repository/AirportRepository.java` (`String`)
- 업무에서 이렇게 말함 : 「IDの型がエンティティと合っていません」

### D05. 기본 메서드 findById / save (標準メソッド)
- 생김새 :
```java
slotRepository.findById(slotId)
slotRepository.save(slot)
```
- 하는 일 : `findById`는 ID로 한 건을 찾고, `save`는 저장한다. 이 메서드들은 `JpaRepository`에 이미 있어서 개발자가 만들 필요가 없다. 프로젝트 규칙상 이것들은 `@Query` 없이 그대로 쓴다.
- 우리 코드 : `reservation/service/ReservationService.java`, `common/config/DataInitializer.java`
- 업무에서 이렇게 말함 : 「findByIdとsaveは標準メソッドをそのまま使います」

### D06. @Entity (@Entity)
- 생김새 :
```java
@Entity
public class Flight { ... }
```
- 하는 일 : `@Entity`는 "이 클래스는 DB 테이블과 연결된다"는 표시다. JPA는 `@Entity`가 붙은 클래스만 엔티티로 다룬다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`, `member/domain/Member.java`
- 업무에서 이렇게 말함 : 「@Entityが付いていないとテーブルにマッピングされません」

### D07. @Table (@Table)
- 생김새 :
```java
@Table(name = "flight")
```
- 하는 일 : `@Table`은 엔티티가 연결될 테이블 이름을 정한다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`
- 업무에서 이렇게 말함 : 「テーブル名は@Tableで明示しています」

### D08. @Id / PK (主キー)
- 생김새 :
```java
@Id
@Column(name = "flight_id")
private Long id;
```
- 하는 일 : `@Id`는 이 필드가 기본 키(PK)라는 표시다. PK는 테이블에서 한 줄을 하나로 정하는 값이고, 겹칠 수 없다.
- 우리 코드 : `flight/domain/Flight.java` (`Long id`), `airport/domain/Airport.java` (`String airportCode`)
- 업무에서 이렇게 말함 : 「空港テーブルは空港コードを主キーにしています」

### D09. FK (外部キー)
- 생김새 :
```java
@JoinColumn(name = "facility_id", nullable = false)
private Facility facility;
```
- 하는 일 : FK는 다른 테이블의 PK를 가리키는 컬럼이다. `slot.facility_id`는 `facility` 테이블의 한 줄을 가리킨다.
- 우리 코드 : `reservation/domain/Slot.java` (연습 코드). 항공 쪽은 FK 대신 ID 참조(A12)를 쓴다.
- 업무에서 이렇게 말함 : 「外部キー制約は張っていますか」

### D10. @GeneratedValue 채번 (採番)
- 생김새 :
```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```
- 하는 일 : `@GeneratedValue(IDENTITY)`는 새 행을 저장할 때 DB가 ID 번호를 1, 2, 3… 자동으로 매기게 한다.
- 우리 코드 : `flight/domain/Flight.java`, `member/domain/Member.java`
- 업무에서 이렇게 말함 : 「IDはDBの自動採番に任せています」

### D11. @Column (@Column)
- 생김새 :
```java
@Column(name = "departure_airport", nullable = false, columnDefinition = "CHAR(3)")
@Column(name = "created_at", nullable = false, updatable = false)
@Column(name = "flight_number", nullable = false, length = 10)
```
- 하는 일 : `@Column`은 필드와 연결될 컬럼 이름과 조건을 정한다. `nullable = false`는 빈 값 금지, `length`는 글자 수, `columnDefinition`은 DB 타입 직접 지정, `updatable = false`는 처음 저장 후 수정 금지다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`
- 업무에서 이렇게 말함 : 「カラム名はスネークケース、フィールド名はキャメルケースです」

### D12. @Enumerated (@Enumerated)
- 생김새 :
```java
@Enumerated(EnumType.STRING)
private Gender gender;
```
- 하는 일 : `@Enumerated(STRING)`은 enum 값을 DB에 `"MALE"` 같은 글자로 저장한다. 글자로 저장하면 나중에 enum 순서를 바꿔도 데이터가 깨지지 않는다.
- 우리 코드 : `member/domain/Member.java` 의 `gender`, `grade`
- 업무에서 이렇게 말함 : 「EnumはSTRINGで保存してください」

### D13. @ManyToOne / @JoinColumn (多対一 / 結合カラム)
- 생김새 :
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "facility_id", nullable = false)
private Facility facility;
```
- 하는 일 : `@ManyToOne`은 "슬롯 여러 개가 시설 하나에 속한다"는 관계를 나타낸다. `@JoinColumn`은 그 관계에 쓰는 FK 컬럼 이름을 정한다.
- 우리 코드 : `reservation/domain/Slot.java` (연습 코드)
- 업무에서 이렇게 말함 : 「関連は@ManyToOneの片方向だけにしています」

### D14. 지연 로딩 LAZY (遅延ロード)
- 생김새 :
```java
@ManyToOne(fetch = FetchType.LAZY)
```
- 하는 일 : 지연 로딩은 관련 객체(시설)를 처음에 불러오지 않고, 실제로 쓸 때 DB에서 가져온다. 트랜잭션 밖에서 처음 쓰면 에러가 날 수 있다.
- 우리 코드 : `reservation/domain/Slot.java`, 대응 방법은 `reservation/controller/ReservationController.java` 주석
- 업무에서 이렇게 말함 : 「LAZYなのでトランザクション外で触ると例外になります」

### D15. @Version 낙관적 락 (楽観ロック)
- 생김새 :
```java
@Version
private Long version;
```
- 하는 일 : `@Version`은 저장할 때마다 version 숫자를 1씩 올린다. 두 사람이 동시에 같은 행을 고치면, 늦게 저장한 쪽은 version이 달라서 `ObjectOptimisticLockingFailureException`이 난다.
- 우리 코드 : `reservation/domain/Slot.java`, 처리는 `reservation/service/ReservationService.java` 의 `reserveSlot` (연습 코드)
- 업무에서 이렇게 말함 : 「同時更新は楽観ロックで制御しています」

### D16. 감사 필드 (監査項目)
- 생김새 :
```java
@EntityListeners(AuditingEntityListener.class)
public class Flight {
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```
- 하는 일 : 감사 필드는 "언제 만들고 언제 고쳤는지"를 자동으로 기록하는 칸이다. `@CreatedDate`는 처음 저장할 때, `@LastModifiedDate`는 고칠 때마다 시각을 넣는다. 이 자동 기록은 `@EnableJpaAuditing` 설정이 있어야 동작한다.
- 우리 코드 : `flight/domain/Flight.java`, `airport/domain/Airport.java`, `member/domain/Member.java`. (`@EnableJpaAuditing` 설정 파일은 아직 없다)
- 업무에서 이렇게 말함 : 「登録日時・更新日時は監査項目として自動で入れます」

### D17. JPQL / @Query (JPQL)
- 생김새 :
```java
@Query("SELECT f FROM Flight f "
     + " WHERE f.departureAirport = :departureAirport "
     + " ORDER BY f.departureAt ASC")
```
  → 테이블 이름이 아니라 엔티티 이름(`Flight`), 컬럼 이름이 아니라 필드 이름(`departureAt`)
- 하는 일 : JPQL은 엔티티 기준으로 쓰는 SQL이다. `@Query`는 리포지토리 메서드에 JPQL을 직접 적는다. 프로젝트 규칙상 조회 쿼리는 `@Query`로 쓴다.
- 우리 코드 : `flight/repository/FlightRepository.java` 의 `searchFlights`, `airport/repository/AirportRepository.java` 의 `findAllAirports`
- 업무에서 이렇게 말함 : 「JPQLなのでカラム名ではなくフィールド名で書いてください」

### D18. @Param (名前付きパラメータ)
- 생김새 :
```java
" AND f.departureAt >= :now"
...
@Param("now") LocalDateTime now
```
  → 쿼리 안 `:이름` ↔ `@Param("이름")`
- 하는 일 : `@Param`은 메서드 매개변수 값을 쿼리 안의 `:이름` 자리에 넣는다. 두 이름이 다르면 에러가 난다.
- 우리 코드 : `flight/repository/FlightRepository.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「名前付きパラメータで値をバインドしています」

### D19. 메서드 이름 쿼리 (メソッド名クエリ / クエリメソッド)
- 생김새 :
```java
List<Slot> findByFacilityIdAndStartTimeBetween(Long facilityId, LocalDateTime start, LocalDateTime end);
```
  → `findBy` + 필드 이름 + 조건
- 하는 일 : 메서드 이름 쿼리는 메서드 이름만 보고 스프링이 쿼리를 자동으로 만든다. 조건이 많으면 이름이 너무 길어져서, 우리 프로젝트 규칙은 `@Query`를 쓰도록 정했다.
- 우리 코드 : `reservation/repository/SlotRepository.java` (연습 코드)
- 업무에서 이렇게 말함 : 「メソッド名が長くなるので@Queryに書き換えます」

### D20. 트랜잭션 (トランザクション)
- 생김새 :
```java
@Transactional
public void reserveSlot(Long slotId, Long userId) { ... }
```
- 하는 일 : 트랜잭션은 DB 작업 여러 개를 "전부 성공 아니면 전부 취소"로 묶는 단위다. 중간에 예외가 나면 그때까지 한 변경이 취소(롤백)된다.
- 우리 코드 : `reservation/service/ReservationService.java`, `flight/service/FlightService.java`
- 업무에서 이렇게 말함 : 「トランザクション境界はサービス層で切ります」

### D21. ddl-auto (ddl-auto)
- 생김새 :
```yaml
jpa:
  hibernate:
    ddl-auto: update
```
- 하는 일 : `ddl-auto: update`는 앱이 켜질 때 엔티티를 보고 테이블을 만들거나 컬럼을 추가한다.
- 우리 코드 : `src/main/resources/application.yml`
- 업무에서 이렇게 말함 : 「ローカルだけddl-autoをupdateにしています」

---

## 5. 빌드·설정

### B01. Maven / pom.xml (Maven)
- 생김새 :
```xml
<parent>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.2</version>
</parent>
```
- 하는 일 : Maven은 프로젝트를 빌드하고 필요한 라이브러리를 내려받는 도구다. `pom.xml`에 버전과 라이브러리 목록을 적는다.
- 우리 코드 : 프로젝트 루트 `pom.xml` (Java 17, Spring Boot 3.3.2)
- 업무에서 이렇게 말함 : 「mvn compileでビルドが通るか確認してください」

### B02. 의존성 (依存関係)
- 생김새 :
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```
- 하는 일 : 의존성은 프로젝트가 가져다 쓰는 외부 라이브러리다. `pom.xml`에 적으면 Maven이 자동으로 내려받는다.
- 우리 코드 : `pom.xml` 의 `<dependencies>`
- 업무에서 이렇게 말함 : 「pom.xmlに依存関係を追加しました」

### B03. 스타터 (スターター)
- 생김새 :
```xml
<artifactId>spring-boot-starter-validation</artifactId>
```
  → 이름이 `spring-boot-starter-` 로 시작
- 하는 일 : 스타터는 기능 하나에 필요한 라이브러리를 한 번에 묶어 놓은 꾸러미다. 우리는 web, data-jpa, validation, thymeleaf, test 스타터를 쓴다.
- 우리 코드 : `pom.xml`
- 업무에서 이렇게 말함 : 「バリデーションはstarter-validationを入れれば使えます」

### B04. Lombok (Lombok)
- 생김새 :
```java
@Getter
@NoArgsConstructor
public class Facility { ... }
```
- 하는 일 : Lombok은 getter나 기본 생성자 같은 반복 코드를 어노테이션 하나로 자동 생성한다. 항공 쪽 코드는 무엇이 만들어지는지 보이도록 직접 적었다.
- 우리 코드 : `facility/domain/Facility.java`, `reservation/domain/Slot.java` (연습 코드)
- 업무에서 이렇게 말함 : 「Lombokの@Getterで自動生成しています」

### B05. application.yml (設定ファイル)
- 생김새 :
```yaml
spring:
  datasource: ...
server:
  port: 8080
```
- 하는 일 : `application.yml`은 앱 설정 파일이다. DB 주소, 포트, JPA 동작 등을 들여쓰기로 적는다.
- 우리 코드 : `src/main/resources/application.yml`
- 업무에서 이렇게 말함 : 「接続先はapplication.ymlで切り替えます」

### B06. datasource (データソース)
- 생김새 :
```yaml
datasource:
  url: jdbc:postgresql://localhost:5433/reservation
```
- 하는 일 : datasource는 앱이 연결할 DB의 주소와 계정이다. 주소의 `5433`은 Docker로 띄운 PostgreSQL 포트다.
- 우리 코드 : `src/main/resources/application.yml`
- 업무에서 이렇게 말함 : 「データソースの接続先を確認してください」

### B07. show-sql (SQLログ出力)
- 생김새 :
```yaml
jpa:
  show-sql: true
  properties:
    hibernate:
      format_sql: true
```
- 하는 일 : `show-sql: true`는 Hibernate가 DB에 보낸 SQL을 콘솔에 찍는다. `format_sql`은 그 SQL을 줄바꿈해서 읽기 쉽게 한다.
- 우리 코드 : `src/main/resources/application.yml`
- 업무에서 이렇게 말함 : 「発行SQLをコンソールで確認しました」

### B08. Docker Compose (Docker Compose)
- 생김새 :
```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5433:5432"
```
- 하는 일 : Docker Compose는 DB 같은 프로그램을 설정 파일 하나로 띄운다. `docker compose up -d`를 실행하면 PostgreSQL 16이 켜진다.
- 우리 코드 : 프로젝트 루트 `docker-compose.yml`
- 업무에서 이렇게 말함 : 「DBはdocker composeで立ち上げてください」

### B09. 포트 (ポート)
- 생김새 :
```yaml
server:
  port: 8080
```
```yaml
ports:
  - "5433:5432"   # 내 PC 5433 → 컨테이너 안 5432
```
- 하는 일 : 포트는 한 컴퓨터 안에서 프로그램을 구분하는 번호다. 우리 앱은 8080, DB는 5433으로 접속한다.
- 우리 코드 : `src/main/resources/application.yml`, `docker-compose.yml`
- 업무에서 이렇게 말함 : 「8080番ポートが既に使われています」

---

## 6. HTTP·API

### H01. API / 엔드포인트 (API / エンドポイント)
- 생김새 :
```
GET /api/flights
GET /api/airports
```
  → HTTP 메서드 + 주소
- 하는 일 : API는 프로그램끼리 데이터를 주고받는 창구다. 엔드포인트는 그 창구 하나하나의 주소다.
- 우리 코드 : `flight/controller/FlightController.java`, `airport/controller/AirportController.java`, 명세는 `docs/specs/specs.md`
- 업무에서 이렇게 말함 : 「このエンドポイントのI/Fを確認させてください」

### H02. HTTP 메서드 (HTTPメソッド)
- 생김새 :
```java
@GetMapping    // GET: 조회
@PostMapping   // POST: 등록·변경
```
- 하는 일 : HTTP 메서드는 요청의 목적을 나타낸다. GET은 데이터를 읽기만 하고, POST는 데이터를 만들거나 바꾼다.
- 우리 코드 : `flight/controller/FlightController.java` (GET), `reservation/controller/ReservationController.java` (POST)
- 업무에서 이렇게 말함 : 「照会なのでGETにしてください」

### H03. 요청 / 응답 (リクエスト / レスポンス)
- 생김새 :
```
요청 : GET /api/flights?departureAirport=FUK&arrivalAirport=HND
응답 : 200 [{"id":1,"flightNumber":"JL305", ...}]
```
- 하는 일 : 요청은 화면(브라우저)이 서버에 보내는 것이고, 응답은 서버가 돌려주는 것이다.
- 우리 코드 : `docs/specs/specs.md` 의 "入力"(요청), "出力"(응답)
- 업무에서 이렇게 말함 : 「リクエストとレスポンスの項目を仕様書に書いてください」

### H04. 상태 코드 (ステータスコード)
- 생김새 :
```java
ResponseEntity.ok(...)                // 200
HttpStatus.BAD_REQUEST                // 400
```
- 하는 일 : 상태 코드는 응답 결과를 숫자로 알려 준다. 200은 성공, 400은 요청이 잘못됨, 500은 서버 안에서 예상 못 한 에러가 남이다.
- 우리 코드 : `flight/controller/FlightController.java` (200), `common/exception/ErrorCode.java` (400)
- 업무에서 이렇게 말함 : 「入力エラーは400で返します」

### H05. 쿼리 파라미터 (クエリパラメータ)
- 생김새 :
```
/api/flights?departureAirport=FUK&arrivalAirport=HND
```
  → 주소 뒤 `?키=값`, 여러 개면 `&`로 이음
- 하는 일 : 쿼리 파라미터는 주소 뒤에 붙여 보내는 검색 조건이다. 컨트롤러는 `@RequestParam`으로 받는다.
- 우리 코드 : `flight/controller/FlightController.java` 의 `searchFlights`
- 업무에서 이렇게 말함 : 「検索条件はクエリパラメータで渡してください」

### H06. 경로 변수 (パス変数)
- 생김새 :
```
/api/slots/3/reserve
           ↑ 경로 변수
```
- 하는 일 : 경로 변수는 주소 중간에 들어가는 값이다. 주로 "몇 번 데이터인지"(ID)를 나타낸다. 컨트롤러는 `@PathVariable`로 받는다.
- 우리 코드 : `reservation/controller/ReservationController.java` (연습 코드)
- 업무에서 이렇게 말함 : 「対象IDはパス変数に入れます」

### H07. JSON (JSON)
- 생김새 :
```json
{"code": "ER001", "message": "出発地・到着地を選択してください。"}
```
- 하는 일 : JSON은 데이터를 `{"키": 값}` 모양의 글자로 표현하는 형식이다. 서버와 화면은 JSON으로 데이터를 주고받는다.
- 우리 코드 : `common/exception/ErrorResponse.java` 가 바뀐 모양, `docs/specs/specs.md`
- 업무에서 이렇게 말함 : 「レスポンスはJSON形式で返します」

### H08. 직렬화 Jackson (シリアライズ)
- 생김새 :
```java
public String getCode() { return code; }   // → "code": ...
```
  → getter 1개 = JSON 항목 1개
- 하는 일 : 직렬화는 자바 객체를 JSON 글자로 바꾸는 일이다. 스프링 안의 Jackson이 getter를 보고 자동으로 바꾼다. `LocalDateTime`은 `"2026-10-01T09:00:00"` 모양이 된다.
- 우리 코드 : `flight/dto/FlightResponse.java`, `common/exception/ErrorResponse.java`
- 업무에서 이렇게 말함 : 「GetterがないとシリアライズされずにJSONに出ません」

---

## 7. 헷갈리는 용어 비교 표

| 비교 | 왼쪽 | 오른쪽 | 우리 코드에서 |
|---|---|---|---|
| 오버로드 (オーバーロード) vs 오버라이드 (オーバーライド) | 오버로드 : 같은 클래스 안에 **이름은 같고 매개변수가 다른** 메서드를 여러 개 만드는 것 | 오버라이드 : 부모 클래스에서 물려받은 메서드를 자식 클래스가 **같은 모양으로 다시 쓰는** 것 | 우리 코드에 직접 쓴 곳은 없음. 가까운 예 : `ResponseEntity.ok()`와 `ResponseEntity.ok(값)`은 스프링이 만든 오버로드 |
| 런타임 (実行時) vs RuntimeException | 런타임 : 프로그램이 **실행되고 있는 때**. 컴파일(번역) 때와 반대 | RuntimeException : 자바 **예외 클래스 이름**. try-catch 없이 던질 수 있는 예외의 부모 | `BusinessException extends RuntimeException` 은 클래스 이야기. ER002는 런타임(실행 중)에 던져짐 |
| `ErrorCode.ER001` vs `getStatus()` | `ErrorCode.ER001` : enum **객체 하나** (번호 + 상태 코드 + 메시지가 든 묶음) | `getStatus()` : 그 객체 **안에 든 값 하나**(400)를 꺼내는 메서드 | `toResponse(ErrorCode.ER001)` 로 묶음을 넘기고, 안에서 `errorCode.getStatus()` 로 400만 꺼냄 |
| 반환 타입 `ResponseEntity` vs 본문 타입 `ErrorResponse` | `ResponseEntity` : HTTP **응답 전체** 상자 (상태 코드 + 본문) | `ErrorResponse` : 그 상자 **안의 본문**(JSON)만 | `ResponseEntity<ErrorResponse>` = "본문이 ErrorResponse인 응답" |
| 엔티티 vs DTO | 엔티티 : **DB 쪽** 모양. 테이블 한 줄. 업무 규칙을 가짐 | DTO : **화면 쪽** 모양. 필요한 값만. 로직 없음 | `Flight` → 서비스에서 변환 → `FlightResponse` (`createdAt`은 DTO에 없음) |
| `@Controller` vs `@RestController` | `@Controller` : 돌려준 문자열이 **화면 파일 이름** | `@RestController` : 돌려준 값이 **JSON**으로 바뀜 | `ReservationViewController`(화면) vs `FlightController`(JSON) |
| `@RequestParam` vs `@PathVariable` | `@RequestParam` : 주소 **뒤** `?키=값` | `@PathVariable` : 주소 **중간** `/{id}/` | `FlightController` 는 `?departureAirport=FUK`, `ReservationController` 는 `/{slotId}/reserve` |
| JPQL vs SQL | JPQL : **엔티티·필드 이름** (`Flight`, `departureAt`) | SQL : **테이블·컬럼 이름** (`flight`, `departure_at`) | `FlightRepository` 는 JPQL. `departure_at` 을 쓰면 틀림 (STUDY_LOG 10/09 피드백) |
| `@Query` vs 메서드 이름 쿼리 | `@Query` : 쿼리를 **직접 적음** | 메서드 이름 쿼리 : **이름으로 자동 생성** | 프로젝트 규칙은 `@Query`. `SlotRepository` 의 `findBy~` 는 연습 코드 |
| 매개변수 (仮引数) vs 인자 (実引数) | 매개변수 : 메서드를 **만들 때** 적는 칸 `String departureAirport` | 인자 : 메서드를 **부를 때** 넣는 실제 값 `"FUK"` | 일본 현장에서는 둘 다 보통 「引数」라고 부름 |
| 검사 (`if`) vs 신고 (`throw`) | `if` : 규칙 위반인지 **판단** | `throw` : 위반이라고 **알리고 위로 넘김** | `FlightService` 의 【2】 `if` → 【3】 `throw` (EXCEPTION_GUIDE 참고) |
| `BusinessException` vs 스프링 예외 | `BusinessException` : **내가** 던짐. 에러 코드가 안에 있음 | `HandlerMethodValidationException` 등 : **스프링이** 던짐. 에러 코드 없음 | 핸들러가 전자는 `e.getErrorCode()` 로 꺼내고, 후자는 `ErrorCode.ER001` 을 직접 붙임 |
| `IllegalStateException` vs `IllegalArgumentException` | State : **지금 상태**로는 안 됨 (이미 예약됨) | Argument : **받은 값**이 잘못됨 (없는 ID) | `Slot.reserve` vs `ReservationService.reserveSlot` 의 `orElseThrow` |
| `LocalDate` vs `LocalDateTime` | `LocalDate` : **날짜만** | `LocalDateTime` : **날짜 + 시각** | `Member.birthDate` vs `Flight.departureAt` |
| 400 vs 500 | 400 : **요청한 쪽**이 잘못함 (입력 오류, 규칙 위반) | 500 : **서버 안**에서 예상 못 한 에러 | 핸들러가 받으면 400. 받지 못한 예외(예 : `@Validated` 를 붙였을 때)는 500 |
