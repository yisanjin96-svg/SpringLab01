# SpringLab01 ✈️ HOSHIMOTO AIR

> 비행기 예약 시스템으로 스프링 포트폴리오 작성하기.<br>
> 航空券予約システムでSpringのポートフォリオを作成する。
>
> 목적은 SPRING FRAMEWORK 숙달.<br>
> 目的はSPRING FRAMEWORKの習熟。

---

## 🛠 기술 스택
## 🛠 技術スタック

| 구분<br>区分 | 기술<br>技術 |
|---|---|
| Backend | Java 17, Spring Boot 3.3, Spring Data JPA, Validation, Lombok |
| Database | PostgreSQL 16 (Docker Compose) |
| Frontend | React 18, TypeScript, Vite |
| View (데모용)<br>View (デモ用) | Thymeleaf |

---

## 🏛 아키텍처
## 🏛 アーキテクチャ

**도메인 단위 패키지 + 계층형 (Package by Feature)**<br>
**ドメイン単位パッケージ + レイヤード (Package by Feature)**

```
com.hoshimoto.lovemyself
├── common/        설정 · 공통 예외 · 기본 엔티티   / 設定・共通例外・基底エンティティ
├── member/        회원                             / 会員
├── flight/        항공편 · 공항 · 좌석 · 운임      / 航空便・空港・座席・運賃
└── reservation/   예약                             / 予約
      └── controller → service → repository → domain  (한 방향 호출 / 一方向の呼び出し)
```

- 다른 도메인은 **service까지만** 호출하고, repository는 직접 부르지 않습니다.<br>
  他ドメインは**serviceまで**呼び出し、repositoryは直接呼び出しません。
- 비즈니스 규칙은 엔티티 안에 두고 (예: `slot.reserve()`), service는 흐름과 트랜잭션만 맡습니다.<br>
  ビジネスルールはエンティティ内に置き（例: `slot.reserve()`）、serviceは処理の流れとトランザクションのみを担当します。
- 자세한 내용: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)<br>
  詳細: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## 📚 학습 기록
## 📚 学習記録

| 날짜<br>日付 | 주제<br>テーマ | 배운 것<br>学んだこと |
|---|---|---|
| 09/07 | **항공권 예약 시스템으로 전환**<br>**航空券予約システムへ移行** | 도메인 단위 아키텍처 도입<br>ドメイン単位アーキテクチャの導入 |
| 09/23 | **테이블 설계**<br>**テーブル設計** | member · flight · airport · seat · flight_fare 설계와 설계 이유 문서화<br>member・flight・airport・seat・flight_fareの設計と設計理由のドキュメント化 |
| 10/06 | **프로젝트 정비**<br>**プロジェクト整備** | 아키텍처·테이블 설계서·기능 정의 문서 작성, `.gitignore`와 Git 규칙 정리<br>アーキテクチャ・テーブル設計書・機能定義書の作成、`.gitignore`とGitルールの整理 |

---

## 🗄 테이블 설계 (요약)
## 🗄 テーブル設計（概要）

```
airport 1 ──< N flight 1 ──< N seat
                       1 ──< N flight_fare
member
```

---

## 📁 문서
## 📁 ドキュメント

| 문서<br>ドキュメント | 내용<br>内容 |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 아키텍처, 레이어 역할, 프로젝트 규칙<br>アーキテクチャ、レイヤーの役割、プロジェクトルール |
| [docs/db/테이블설계서.MD](docs/db/테이블설계서.MD) | 테이블 정의, 인덱스, 설계 이유<br>テーブル定義、インデックス、設計理由 |
| [docs/specs/specs.md](docs/specs/specs.md) | 기능 정의<br>機能定義 |
| [frontend/SCREENS.md](frontend/SCREENS.md) | 화면 정의<br>画面定義 |
