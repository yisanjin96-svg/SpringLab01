# 화면 정의서 (loveMyself Air 목업)

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
