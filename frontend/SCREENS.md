# 화면 정의서 (loveMyself Air 목업)

## 진행 현황 (2026-10-16 기준)

### 백엔드 API (완성)

| 기능 | API | 화면에서 쓰는 곳 | 상태 |
|---|---|---|---|
| X0 공항 목록 | `GET /api/airports` → `List<AirportResponse>` | X1 출발지·도착지 드롭다운 | ✅ 완성 · 실행 확인 |
| X1 항공편 검색 | `GET /api/flights?departureAirport=FUK&arrivalAirport=HND` → `List<FlightResponse>` | X2 항공편 목록 | ✅ 완성 · 실행 확인 |
| 공통 에러 | `400 {"code": "ER001", "message": "..."}` | X1 입력 에러, X2 서버 에러 표시 | ✅ 완성 · 실행 확인 |

자세한 입출력: [docs/specs/specs.md](../docs/specs/specs.md) (X0·X1·X2)
설계서: `doc/excel/화면설계서_X1_항공편검색.xlsx`, `doc/excel/화면설계서_X2_항공편목록.xlsx`

### 화면 (1단계 = 편도·공항 코드만)

| 화면 | 경로 | 페이지 | 상태 |
|---|---|---|---|
| X1 항공편 검색(홈) | `/` | `features/home/pages/Home.tsx` | ✅ 드롭다운(X0)·입력 체크·X2로 이동 |
| X2 항공편 목록 | `/flights?departureAirport=…&arrivalAirport=…` | `features/flight/pages/FlightList.tsx` | ✅ 작성 (브라우저 확인 필요) |
| X3 | — | — | 미정 (X2에서 항공편 선택 후 이동, 2단계) |

### 화면 흐름

```
X1 검색 버튼 ─(입력 체크 OK)→ navigate('/flights?departureAirport=…&arrivalAirport=…')
X2 표시 ─ useSearchParams로 조건 꺼냄 → GET /api/flights → 목록 / 0건(I001) / 에러(ER001·ER002·E010)
```

- X1은 API를 부르지 않고 이동만 한다. 조건이 URL에 남으므로 뒤로 가기·북마크로 같은 결과를 볼 수 있다.

### 파일 구성

| feature | 파일 | 역할 |
|---|---|---|
| home | `types.ts` / `api.ts` / `hooks/useAirports.ts` | X0 공항 목록 |
| home | `components/X1_FlightSearchBar.tsx` | X1 검색바 (화면 전용) |
| home | `components/C1_AirportSelect.tsx` | 공항 드롭다운 (공통 부품) |
| flight | `types.ts` / `api.ts` / `hooks/useFlights.ts` | X1 API(항공편 검색) 호출 |
| flight | `components/X2_FlightTable.tsx` | X2 목록 표 (화면 전용) |
| flight | `pages/FlightList.tsx` | X2 화면 |

- 명명 규칙: 화면 전용 `{画面ID}_{PascalCase}`, 공통 `C{番号}_{PascalCase}` (frontend/CLAUDE.md)
- features끼리는 import하지 않는다. 화면 이동은 URL로만 연결한다.

### 다음 할 일

1. X2 브라우저 확인 (HND→ICN 1건, FUK→HND 0건 I001, URL에 소문자 `fuk` 직접 입력 시 ER001)
2. X2 2단계 정의: 항공편 선택 → X3, 남은 좌석 수 (`idx_seat_flight_status` 사용)
3. X1 2단계: 출발일·왕복·인원을 API로 보내기

---

대한항공 예약 홈페이지를 오마주한 항공권 조회/예약 목업입니다.
**실제 Entity/백엔드 API와는 아직 연결되지 않았고**, `src/mock`의 목업 데이터만 사용합니다.

## 레이어 구조

| 레이어 | 위치 | 설명 |
|---|---|---|
| API | `src/api` | 백엔드 연동용 (아직 이 목업 화면들은 사용하지 않음) |
| 컴포넌트 | `src/components/airline` | 화면을 구성하는 재사용 UI 조각 (헤더, 검색위젯, 좌석맵 등) |
| 페이지 | `src/pages` | 화면 단위 컴포넌트. 아래 번호(A-1, B-1 ...)와 1:1 매칭 |
| 데이터바인딩 모델 | `src/models` + `src/mock` | `models`는 타입 정의, `mock`은 화면이 바인딩할 목업 데이터. 추후 Entity 연동 시 이 자리를 실제 API 응답으로 교체 |

기존 "낙관적 락 학습용" 데모(Facility/Slot 실제 API 연동)는 `src/pages/legacy/LockDemoPage.tsx`로 이동, `/demo/lock` 경로에서 그대로 유지됩니다.

## 화면 목록

도메인 알파벳(A, B, C ...) + 순번으로 넘버링합니다. 같은 도메인 안에서 사용자가 거치는 순서대로 번호를 붙였습니다.

### A. 메인 (Home)

| 번호 | 화면명 | 경로 | 페이지 파일 | 설명 |
|---|---|---|---|---|
| A-1 | 메인 홈 | `/` | `pages/A1_Home.tsx` | 히어로 배너 + 항공권 검색 위젯(왕복/편도, 출발·도착, 날짜, 인원, 좌석등급) + 프로모션 카드 |

### B. 항공편 조회 (Search)

| 번호 | 화면명 | 경로 | 페이지 파일 | 설명 |
|---|---|---|---|---|
| B-1 | 조회 결과 목록 | `/search` | `pages/B1_SearchResults.tsx` | 검색 조건 요약 바 + 항공편 리스트(시간/직항여부/최저가), 카드 선택 시 B-2로 이동 |
| B-2 | 항공편 상세 · 운임 선택 | `/flights/:id` | `pages/B2_FlightDetail.tsx` | 선택한 항공편의 상세 정보 + 운임(일반석/프레스티지/일등석) 비교표, 운임 선택 시 C-1로 이동 |

### C. 예약 (Booking)
| 번호 | 화면명 | 경로 | 페이지 파일 | 설명 |
|---|---|---|---|---|
| C-1 | 탑승객 정보 입력 | `/booking/passengers` | `pages/C1_PassengerInfo.tsx` | 탑승객 수만큼 이름/생년월일/성별/여권번호 입력 폼 + 우측 예약 요약 |
| C-2 | 좌석 선택 | `/booking/seats` | `pages/C2_SeatSelection.tsx` | 좌석 등급에 맞는 좌석 배치도에서 탑승객 수만큼 좌석 클릭 선택 |
| C-3 | 결제 정보 입력 | `/booking/payment` | `pages/C3_Payment.tsx` | 카드 정보 입력 + 약관 동의 + 결제 버튼 |
| C-4 | 예약 완료 | `/booking/complete` | `pages/C4_Confirmation.tsx` | 예약번호(PNR), 여정/탑승객/좌석/결제금액 요약, 홈으로 이동 |

## 사용자 플로우

```
A-1 (검색) → B-1 (결과 목록) → B-2 (운임 선택)
  → C-1 (탑승객 정보) → C-2 (좌석 선택) → C-3 (결제) → C-4 (완료)
```

각 페이지는 이전 단계에서 `react-router`의 `navigate(path, { state })`로 전달한 값을 사용하되,
주소를 직접 입력해 들어와도(예: `/booking/payment` 바로 접속) 목업 기본값(`src/mock/mockData.ts`의 `DEFAULT_CRITERIA`, `MOCK_FLIGHTS[0]`)으로 채워져 화면 확인이 가능합니다.

## 다음 단계 (Entity 연동 시)

- `src/mock/mockData.ts` → `src/api`의 실제 fetch 호출로 교체
- `src/models/flight.ts`의 타입을 백엔드 DTO(`SlotDto` 등)에 맞춰 정합성 확인
- B-1의 검색 필터링, C-2 좌석 점유 여부 등을 서버 응답 기반으로 교체
