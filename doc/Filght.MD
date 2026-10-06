컬럼	타입	예시	용도

flight_id	Long (PK)	1	식별자

flight_number	String(10)	JL305	편명(便名)

departure_airport	String(3)	FUK	출발 공항 코드

arrival_airport	String(3)	HND	도착 공항 코드

departure_at	LocalDateTime	2026-10-01 09:00	출발 일시

arrival_at	LocalDateTime	2026-10-01 10:35	도착 일시

created_at	LocalDateTime		감사(監査) 일시

updated_at	LocalDateTime		감사 일시


Seat 쪽에만 @ManyToOne을 두고, 
Flight에는 좌석 목록을 두지 않습니다.
