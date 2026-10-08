## Spec

### API-01 항공편 조회

| 항목 | 내용 |
|---|---|
| 메서드 / URL | `GET /api/flights` |
| 대상 테이블 | `flight` (조회만, 상태 변경 없음) |
| 도메인 | `flight` |
| 요청 DTO | `flight/dto/FlightSearchRequest.java` |
| 응답 DTO | `flight/dto/FlightResponse.java` (리스트로 반환) |

**요청 DTO : `FlightSearchRequest.java`** (Query String → `@ModelAttribute`로 받음)

```java
public class FlightSearchRequest {

    @NotBlank
    @Size(min = 3, max = 3)
    private final String departureAirport;  // 출발 공항 코드 (완전 일치) 예: HND

    @NotBlank
    @Size(min = 3, max = 3)
    private final String arrivalAirport;    // 도착 공항 코드 (완전 일치) 예: FUK
}
```

| 필드 | 타입 | 필수 | 비교 방식 | 대응 컬럼 |
|---|---|---|---|---|
| departureAirport | String | ○ | 완전 일치 (`=`) | `flight.departure_airport` |
| arrivalAirport | String | ○ | 완전 일치 (`=`) | `flight.arrival_airport` |

**Repository : `FlightRepository.java`** (`@Query`로 직접 작성)

```java
@Query("""
    SELECT f
    FROM Flight f
    WHERE f.departureAirport = :departureAirport
      AND f.arrivalAirport   = :arrivalAirport
      AND f.arrivalAt        > :now
    ORDER BY f.departureAt ASC
    """)
List<Flight> searchFlights(@Param("departureAirport") String departureAirport,
                           @Param("arrivalAirport") String arrivalAirport,
                           @Param("now") LocalDateTime now);
```

- `:now` 는 클라이언트가 보내지 않고, service에서 현재 일시(`LocalDateTime.now()`)를 넣는다.
- 도착 일시(`arrival_at`)가 현재 일시보다 이후인 항공편만 조회한다.

**응답 DTO : `FlightResponse.java`** (200 OK, 0건이면 빈 배열 `[]`)

```java
public class FlightResponse {

    private final Long flightId;              // flight_id         예: 1
    private final String flightNumber;        // flight_number     예: JL305
    private final String departureAirport;    // departure_airport 예: HND
    private final String arrivalAirport;      // arrival_airport   예: FUK
    private final LocalDateTime departureAt;  // departure_at      예: 2026-10-10T09:00:00
    private final LocalDateTime arrivalAt;    // arrival_at        예: 2026-10-10T10:35:00
}
```

```json
[
  {
    "flightId": 1,
    "flightNumber": "JL305",
    "departureAirport": "HND",
    "arrivalAirport": "FUK",
    "departureAt": "2026-10-10T09:00:00",
    "arrivalAt": "2026-10-10T10:35:00"
  }
]
```

**에러**

| 상황 | 응답 |
|---|---|
| departureAirport / arrivalAirport 누락, 3자리가 아님 | 400 Bad Request |

---

### API-02 공항 조회

| 항목 | 내용 |
|---|---|
| 메서드 / URL | `GET /api/airports` |
| 대상 테이블 | `airport` (조회만, 상태 변경 없음) |
| 도메인 | `flight` (Airport) |
| 요청 DTO | 없음 (파라미터 없음) |
| 응답 DTO | `flight/dto/AirportResponse.java` (리스트로 반환) |

**Repository : `AirportRepository.java`** (`@Query`로 직접 작성)

```java
@Query("""
    SELECT a
    FROM Airport a
    ORDER BY a.airportCode ASC
    """)
List<Airport> findAllAirports();
```

- 조건 없이 전체 취득한다.

**응답 DTO : `AirportResponse.java`** (200 OK, 0건이면 빈 배열 `[]`)

```java
public class AirportResponse {

    private final String airportCode;  // airport_code 예: FUK
    private final String name;         // name         예: 후쿠오카 공항
    private final String city;         // city         예: 후쿠오카
}
```

```json
[
  { "airportCode": "FUK", "name": "후쿠오카 공항", "city": "후쿠오카" },
  { "airportCode": "HND", "name": "하네다 공항", "city": "도쿄" }
]
```
