### 공통 에러 응답

- 형식 : 객체 1개로 응답한다
  `{"code": "ER001", "message": "出発地・到着地を選択してください。"}`

| ErrorCode | HTTP | message |
|---|---|---|
| ER001 | 400 | 出発地・到着地を選択してください。 |
| ER002 | 400 | 出発地と到着地が同じです。 |


### X0 기능 정의 (공항 목록 조회)

- 기능 : X1 검색 바의 출발지·도착지 드롭다운에 표시할 공항 목록을 조회한다
- 갱신 테이블 : 없음 (조회만)

#### 1. 입력 (클라이언트 ➝ 서버)

- 요청 : `GET /api/airports`
- 인수 : 없음

#### 2. 참조 테이블·조건

- 참조 테이블 : `airport`
- WHERE 조건 : 없음 (전체)
- 정렬 : `airport_code` 오름차순

#### 3. 출력 (서버 ➝ 클라이언트)

응답 : `List<AirportResponse>`

| 논리명 | 필드명 | 타입 | 원본 컬럼 | 비고 |
|---|---|---|---|---|
| 공항 코드 | airportCode | String | airport_code | DTO 포함, X1 검색 요청의 인수로 사용 |
| 공항명 | name | String | name | DTO 포함, 드롭다운 표시 (예: 福岡空港 (FUK)) |
| 도시명 | city | String | city | DTO 포함, 드롭다운 표시 |
| 등록 일시 | － | － | created_at | DTO 제외, 감사용이라 화면에 불필요 |
| 갱신 일시 | － | － | updated_at | DTO 제외, 감사용이라 화면에 불필요 |

#### 4. 예외·경계

- 결과 0건 : 200 + 빈 목록 (ErrorCode 없음)


### X1 기능 정의 (2단계: 출발일·왕복 추가)

- 기능 : 출발지, 도착지, 출발일로 항공편 목록을 조회한다
- 범위 외 (다음 단계에서 추가) : 인원수, 도시명 검색, 공항명 표시, 페이징
- 갱신 테이블 : 없음 (조회만)

#### 1. 입력 (클라이언트 ➝ 서버)

- 요청 : `GET /api/flights?departureAirport=FUK&arrivalAirport=HND&departureDate=2026-10-20`
- 공항은 드롭다운(X0)에서 고르므로 화면에서는 잘못된 값이 들어오지 않는다. 다만 API는 직접 호출할 수 있으므로 서버에서도 검증한다

| 인수 | 타입 | 필수 | 검증 |
|---|---|---|---|
| departureAirport | String | ○ | 영대문자 3자리 (소문자는 변환하지 않고 ER001) |
| arrivalAirport | String | ○ | 영대문자 3자리 (소문자는 변환하지 않고 ER001) |
| departureDate | LocalDate | ○ | `yyyy-MM-dd`(ISO 형식). 없으면 ER001. 형식 에러(예: 2026/10/20)는 미대응(핸들러 없음) |

- 왕복 : 복로는 프론트가 출발지와 도착지를 뒤집고, 복로일을 `departureDate`에 넣어 같은 API를 한 번 더 호출한다 (API의 날짜 인수는 1개뿐)

#### 2. 참조 테이블·조건

- 참조 테이블 : `flight`
- WHERE 조건 : `departure_airport` 완전 일치 AND `arrival_airport` 완전 일치
- AND `departure_at` >= 현재 일시 (이미 출발한 편 제외. 현재 일시는 service에서 인수로 넘긴다)
- AND `departure_at` >= 출발일 00:00 AND `departure_at` < 출발일 다음 날 00:00 (service에서 `LocalDate` ➝ `LocalDateTime`으로 변환해서 넘긴다)
- 정렬 : `departure_at` 오름차순

#### 3. 출력 (서버 ➝ 클라이언트)

응답 : `List<FlightResponse>`

| 논리명 | 필드명 | 타입 | 원본 컬럼 | 비고 |
|---|---|---|---|---|
| 항공편 ID | id | Long | flight_id | DTO 포함, 전이 대상(X2)의 ID 참조용 |
| 편명 | flightNumber | String | flight_number | DTO 포함, X1 화면 표시 |
| 출발 공항 코드 | departureAirport | String | departure_airport | DTO 포함, X1 화면 표시 |
| 도착 공항 코드 | arrivalAirport | String | arrival_airport | DTO 포함, X1 화면 표시 |
| 출발 일시 | departureAt | LocalDateTime | departure_at | DTO 포함, X1 화면 표시 |
| 도착 일시 | arrivalAt | LocalDateTime | arrival_at | DTO 포함, X1 화면 표시 |
| 등록 일시 | － | － | created_at | DTO 제외, 감사용이라 화면에 불필요 |
| 갱신 일시 | － | － | updated_at | DTO 제외, 감사용이라 화면에 불필요 |

- 일시의 JSON 형식 : `2026-10-01T09:00:00`

#### 4. 예외·경계

- 결과 0건 : 200 + 빈 목록. 메시지는 클라이언트에서 표시한다 (ErrorCode 없음)
- 존재하지 않는 공항 코드 (예: ZZZ) : 결과 0건과 같게 처리한다 (200 + 빈 목록)
- 인수 없음·형식 에러 : HTTP 400, ER001
- 출발지 = 도착지 : HTTP 400, ER002 (화면에서는 도착지 드롭다운에서 출발지를 제외한다)

#### 5. 구현 메모

- JPA 메서드 이름이 길어지므로 `@Query`를 사용한다


### X2 기능 정의 (항공편 목록·1단계: 편도·공항 코드만)

- 기능 : X1에서 지정한 출발지·도착지의 항공편을 출발 일시 오름차순으로 표시한다
- 범위 외 (다음 단계에서 추가) : 편 선택(X3로 이동), 남은 좌석 수, 운임, 출발일, 왕복, 인원수
- 갱신 테이블 : 없음 (조회만)
- 신규 API : 없음 (X1의 `GET /api/flights`를 그대로 사용)

#### 1. 화면 전이

- 화면 URL : `/flights?departureAirport=FUK&arrivalAirport=HND`
- X1의 검색 버튼 : 입력 체크가 통과하면 API를 호출하지 않고 위 URL로 이동만 한다 (`useNavigate`)
- 검색 조건이 URL에 남으므로 브라우저 뒤로 가기, 북마크, URL 직접 입력으로도 같은 결과를 볼 수 있다
- X2는 표시할 때 URL에서 조건을 꺼내(`useSearchParams`) `GET /api/flights`를 호출한다

#### 2. 입력 (URL ➝ X2 ➝ 서버)

| 인수 | 꺼내는 곳 | 검증 |
|---|---|---|
| departureAirport | URL 쿼리 | 클라이언트에서는 검증하지 않는다. 서버의 ER001·ER002를 그대로 표시한다 |
| arrivalAirport | URL 쿼리 | 위와 같음 |

- URL에 잘못된 값을 직접 넣어도 서버가 검증하므로, 클라이언트 검증은 중복시키지 않는다

#### 3. 표시 항목

| 논리명 | 필드명 | 표시 형식 |
|---|---|---|
| 검색 조건 | departureAirport, arrivalAirport | `FUK ➝ HND` (URL 값) |
| 건수 | flights.length | `n件` |
| 편명 | flightNumber | 그대로 |
| 출발 공항 | departureAirport | 그대로 |
| 도착 공항 | arrivalAirport | 그대로 |
| 출발 일시 | departureAt | `yyyy/MM/dd HH:mm` |
| 도착 일시 | arrivalAt | `yyyy/MM/dd HH:mm` |

- 정렬 : 서버가 돌려준 순서(departure_at 오름차순)를 그대로 쓴다

#### 4. 예외·경계

| 경우 | 표시 |
|---|---|
| 결과 0건 | I001 : 条件に合う航空便がありません。 |
| 서버 400 (ER001·ER002) | 응답의 `message`를 그대로 표시 |
| 통신 실패 (응답 없음) | E010 : 航空便一覧を読み込めませんでした。しばらくしてから再度お試しください。 |

#### 5. 구현 메모 (프론트)

- 항공편 호출은 `features/flight`로 옮긴다 (백엔드의 `flight` 도메인과 1:1)
  - `types.ts` : `FlightResponse`, `ErrorResponse` (home에서 이동)
  - `api.ts` : `fetchFlights()` (home에서 이동)
  - `hooks/useFlights.ts` : home에서 이동. X2 표시 시 호출
  - `pages/FlightList.tsx` : X2 화면
  - `components/X2_FlightTable.tsx` : 목록 표
- `features/home`은 공항(X0)만 가지고, X1은 이동만 하므로 flight를 import하지 않는다 (features 간 import 금지를 지킨다)
- `App.tsx`에 라우팅을 추가한다 : `/` ➝ Home(X1), `/flights` ➝ FlightList(X2)
- X1의 testUI(결과 목록·0건 메시지·flightError)는 X2로 옮기면 삭제한다


