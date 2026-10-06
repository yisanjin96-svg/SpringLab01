# 아키텍처

## 방식
**도메인 단위 패키지 + 계층형 (Package by Feature)**

- 최상위 폴더는 **도메인(기능)** 단위로 나눈다.
- 각 도메인 폴더 안은 **레이어** 단위로 나눈다.
- 호출 방향은 항상 한 방향: `controller → service → repository → domain`

## 프로젝트 RULE
JAVA Effect의 클린아키텍쳐에 준수하여 제조한다.
코드 생성시 JavaDoc 주석에 클린아키텍쳐 챕터 몇장 무슨내용이 적용되었는지 1줄로 기술한다.

## 디렉토리 구조

```
com.hoshimoto.lovemyself
├── common/                 // 전 도메인 공통
│   ├── BaseTimeEntity.java     // createdAt / updatedAt 공통 필드
│   ├── JpaAuditingConfig.java  // @EnableJpaAuditing
│   └── exception/              // 공통 예외, GlobalExceptionHandler
├── domain1/                // 예: member
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── domain/
│   └── dto/
└── domain2/                // 예: flight, reservation
    ├── controller/
    ├── service/
    ├── repository/
    ├── domain/
    └── dto/
```

현재 도메인: `member` / `flight`(Flight, Seat, Airport) / `reservation`

## 레이어 역할

| 레이어 | 역할 | 하지 말 것 |
|---|---|---|
| `controller/` | HTTP 요청을 받아 입력값을 검증하고, service를 호출해 DTO로 응답한다 | 비즈니스 로직 작성, repository 직접 호출 |
| `service/` | 유스케이스 흐름을 조율하고 트랜잭션 경계(`@Transactional`)를 잡는다 | 엔티티 상태를 직접 조작하는 세부 규칙 작성 (domain에 위임) |
| `repository/` | DB 접근 (Spring Data JPA 인터페이스) | 비즈니스 판단 |
| `domain/` | 엔티티, Enum, Value Object. 비즈니스 규칙과 상태 변경 메서드를 가진다 (예: `slot.reserve()`) | Setter 공개, 웹/DTO 의존 |
| `dto/` | 요청/응답 전용 객체. 엔티티를 외부에 노출하지 않기 위해 쓴다 | 로직 작성 |

## 도메인 간 규칙

1. 다른 도메인은 **domain과 service까지만** 참조한다.
2. 다른 도메인의 **repository를 직접 호출하지 않는다**. 필요하면 그 도메인의 service를 통한다.
3. 다른 도메인의 엔티티는 가능하면 **ID로 참조**한다 (예: `Reservation.memberId`).
4. 새 도메인을 추가할 때도 위의 5개 디렉토리 구성을 따른다.

## 예시 흐름 (예약)

```
ReservationController   POST /api/reservations  → 요청 DTO 검증
  └─ ReservationService     @Transactional, 흐름 조율
       ├─ FlightService         (다른 도메인은 service로 호출)
       ├─ ReservationRepository 저장/조회
       └─ Reservation.create()  비즈니스 규칙은 엔티티 안에서
  ← ReservationResponse (DTO)
```
