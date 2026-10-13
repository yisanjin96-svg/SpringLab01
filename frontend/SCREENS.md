# 화면 정의서 (loveMyself Air 목업)

## 진행 현황 (2026-10-12 기준)

### 백엔드 API (완성)

| 기능 | API | 화면에서 쓰는 곳 | 상태 |
|---|---|---|---|
| X0 공항 목록 | `GET /api/airports` → `List<AirportResponse>` | 검색 바의 출발지·도착지 드롭다운 | ✅ 완성 · 실행 확인 |
| X1 항공편 검색 | `GET /api/flights?departureAirport=FUK&arrivalAirport=HND` → `List<FlightResponse>` | 검색 결과 목록 | ✅ 완성 · 실행 확인 |
| 공통 에러 | `400 {"code": "ER001", "message": "..."}` | 검색 실패 시 메시지 표시 | ✅ 완성 (실행 확인 전) |

자세한 입출력: [docs/specs/specs.md](../docs/specs/specs.md)

### 프론트 현재 상태

- 실제 있는 파일: `App.tsx` → `features/home/pages/Home.tsx` → `features/home/components/FlightSearchBar.tsx`
- 검색 바는 **화면만 있고 API 연결 없음** (출발지·도착지가 글자 입력칸, 검색 버튼 동작 없음)
- 아래 "화면 목록"의 `src/pages`, `src/mock` 등은 예전 목업 기준이라 **지금 폴더에는 없음**
- `vite.config.ts`에 `/api` → `localhost:8001` 프록시는 이미 설정됨
- axios 설치 완료 (`^1.20.0`, 10/12)

### 다음 할 일: 화면에 API 연결 (1단계 = specs X0·X1 범위만)

1단계 범위는 편도, 공항 코드만. 날짜·왕복·인원은 화면에 있어도 **API로 보내지 않는다** (specs의 범위 밖).

| 순서 | 할 일 | 연결할 API | 화면 변화 |
|---|---|---|---|
| F1 | 출발지·도착지 입력칸을 **드롭다운**으로 바꾸기 | X0 | 공항 목록이 `福岡空港 (FUK)` 형태로 보임 |
| F2 | 도착지 드롭다운에서 **출발지로 고른 공항 빼기** | — | 같은 공항을 고를 수 없음 (ER002 예방) |
| F3 | 검색 버튼 → 항공편 검색 | X1 | 결과 목록 표시 (편명, 출발·도착 시각) |
| F4 | 결과 0건 / 에러 메시지 표시 | X1 | "검색 결과가 없습니다" / ER001·ER002 메시지 |

### 시작 전에 제이님이 정할 것

1. **파일 위치:** `frontend/CLAUDE.md` 규칙상 `features` 끼리는 서로 import할 수 없음. 검색 바는 `home`에 있는데 공항(X0)·항공편(X1)을 불러와야 함 → 아래 중 하나로 정하기
   - (가) `features/home` 안에 공항·항공편 호출 코드를 같이 두기
   - (나) `features/airport`, `features/flight`를 만들고, `home`은 그것들을 조립만 하는 화면으로 규칙에 예외 두기
2. **F1 정의 글로 쓰기 (수칙 1번):** 어떤 API를 언제 부르고, 받은 어떤 값을 화면 어디에 보여 주는지

### F1에서 만들 파일 (예상, 위 1번 결정에 따라 위치 달라짐)

| 파일 | 역할 | 백엔드로 치면 |
|---|---|---|
| `types.ts` | `AirportResponse` 타입 (백엔드 DTO와 같은 이름·필드) | dto |
| `api.ts` | `fetchAirports()` — `/api/airports` 호출 | (controller를 부르는 쪽) |
| `hooks/useAirports.ts` | 화면이 처음 뜰 때 한 번 불러서 목록을 들고 있음 | service |
| `FlightSearchBar.tsx` | 드롭다운에 목록을 그림 | 화면 |

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
