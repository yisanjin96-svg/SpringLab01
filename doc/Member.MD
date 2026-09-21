#	컬럼	타입	제약	비고
1	member_id	BIGINT	PK, IDENTITY	Java 필드는 id
2	member_name_kanji	VARCHAR(50)	NULL 허용	외국인 대응
3	member_name_kana	VARCHAR(50)	NOT NULL	가나 검색·정렬
4	member_name_roma	VARCHAR(100)	NOT NULL	발권명
5	member_birth_date	DATE	NOT NULL	소아 운임 구분 근거
6	member_gender	VARCHAR(10)	NOT NULL	Enum STRING
7	member_telephone	VARCHAR(20)	NOT NULL	문자열 필수
8	member_email	VARCHAR(255)	부분 UNIQUE	WHERE is_deleted = false
9	member_address	VARCHAR(255)	NULL 허용	단일 컬럼
10	member_grade	VARCHAR(20)	NOT NULL, DEFAULT REGULAR	Enum STRING
11	is_deleted	BOOLEAN	NOT NULL, DEFAULT false	논리삭제
12	created_at	TIMESTAMP	NOT NULL, updatable = false	Auditing
13	updated_at	TIMESTAMP	NOT NULL	Auditing