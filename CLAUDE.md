## 아키텍처・프로젝트 규칙
@docs/ARCHITECTURE.md

## 패키지 구성
도메인 단위로 패키지를 나눈다 (레이어 단위가 아님).

com.hoshimoto.lovemyself
├── common/       설정・공통 예외・기본 엔티티
├── member/       회원
├── flight/       항공편・공항・좌석
└── reservation/  예약

각 도메인 패키지의 내부 구성:
  domain / repository / service / controller / dto

## 패키지 간 규칙
- 다른 도메인은 domain과 service까지만 참조한다
- 다른 도메인의 repository를 직접 호출하지 않는다
- 새 도메인을 추가할 때는 반드시 위의 5개 디렉토리 구성을 따른다


## 사용자(개발자의) 수칙
1. 기능 1개를 만들기 전에, 어떤 테이블의 어떤 컬럼을 어떤 상태로 바꾸고 어떤 데이터를 넘기는지 제이(개발자가)님이 먼저 글로 정의한다.
2. 기능 순서는 같은 패턴이 반복되도록 고른다 (조회 → 조회 → 등록 → 변경).
3. 새로운 패턴의 기능은 전체 코드를 요청하지 않고, 레이어 하나씩 AI에게 물어보며 따라 친다.
4. 따라 친 코드는 외우지 않고, 각 줄이 무엇을 위해 있는지 제이님이 글로 설명해서 검사받는다.
5. 같은 패턴의 다음 기능은 제이님이 먼저 직접 쳐 보고, 막힌 곳만 AI에게 묻는다.



## Git 규칙
- 작업 브랜치는 `2610_develop` 하나만 사용한다
- 커밋 내용은 파일단위로 메세지를 작성한다.
- 커밋 메시지는 [수정내용] 한국어(일본어)로 작성한다.
- 다음은 커밋하지 않는다 (`.gitignore`로 관리)
  - 빌드 산출물: `target/`, `*.class`, `*.jar`, `*.log`
  - 프론트엔드 의존성/캐시: `node_modules/`, `.vite/`, `dist/`
  - IDE/OS 파일: `.idea/`, `*.iml`, `.vscode/`, `.DS_Store`
  - 개인 설정: `.claude/settings.local.json`
  - 민감 정보: `.env*`, `application-local.yml`, `application-secret.yml`, `*.pem`, `*.key`, `*.p12`, `*.jks`
- 비밀번호나 API 키 같은 민감 정보는 코드에 직접 쓰지 않고 환경 변수나 위의 무시 대상 파일로 분리한다
- 커밋 전에 `git status`로 위 파일이 섞여 있지 않은지 확인한다
