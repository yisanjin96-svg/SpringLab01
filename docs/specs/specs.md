### X1 機能定義（第1段階：片道・空港コードのみ）

- 機能 : 出発地➝到着地のみ、出発便名リストを照会する
- 範囲外（次の段階で追加）: 出発日付・往復・人数・都市名検索・空港名表示・ページング
- 更新テーブル : なし（照会のみ）

#### 1. 入力（クライアント側➝サーバー側）

- リクエスト : `GET /api/flights?departureAirport=FUK&arrivalAirport=HND`
- 空港はプルダウン（X0）から選択するため、画面から不正な値は入らない。ただしAPIは直接呼び出せるのでサーバー側でも検証する

| 引数 | 型 | 必須 | 検証 |
|---|---|---|---|
| departureAirport | String | ○ | 英大文字3桁（小文字は変換せずER001） |
| arrivalAirport | String | ○ | 英大文字3桁（小文字は変換せずER001） |
| arrivalAirport | String | ○ | 英大文字3桁（小文字は変換せずER001） |
| arrivalAirport | String | ○ | 英大文字3桁（小文字は変換せずER001） |


#### 2. 参照テーブル・条件

- 参照テーブル : `flight`
- WHERE条件 : `departure_airport` = 完全一致 AND `arrival_airport` = 完全一致
- AND `departure_at` >= 現在日時（出発済みの便は除外。現在日時はserviceから引数で渡す）
- SORT : `departure_at` 昇順

#### 3. 出力（サーバー側➝クライアント側）

レスポンス : `List<FlightResponse>`

| 論理名 | フィールド名 | 型 | 元のカラム | 備考 |
|---|---|---|---|---|
| 航空便ID | id | Long | flight_id | DTO作成O, 遷移先(X2)ID参照の為 |
| 便名 | flightNumber | String | flight_number | DTO作成O, X1画面表示 |
| 出発空港コード | departureAirport | String | departure_airport | DTO作成O, X1画面表示 |
| 到着空港コード | arrivalAirport | String | arrival_airport | DTO作成O, X1画面表示 |
| 出発日時 | departureAt | LocalDateTime | departure_at | DTO作成O, X1画面表示 |
| 到着日時 | arrivalAt | LocalDateTime | arrival_at | DTO作成O, X1画面表示 |
| 登録日時 | － | － | created_at | DTO作成X, 監査用で画面に不要 |
| 更新日時 | － | － | updated_at | DTO作成X, 監査用で画面に不要 |

- 日時のJSON形式 : `2026-10-01T09:00:00`

#### 4. 例外・境界

- 結果0件 : 200 + 空リスト。クライアント側でメッセージを表示する（ErrorCodeなし）
- 存在しない空港コード（例: ZZZ） : 結果0件と同じ扱い（200 + 空リスト）
- 引数なし・形式エラー : HTTP400, ER001
- 出発地 = 到着地 : HTTP400, ER002（画面では到着地プルダウンから出発地を除外する）

#### 5. 実装メモ

- JPAメソッド名が長くなるので `@Query` を使用する


### X0 機能定義（空港リスト照会）

- 機能 : X1検索バーの出発地・到着地プルダウンに表示する空港リストを照会する
- 更新テーブル : なし（照会のみ）

#### 1. 入力（クライアント側➝サーバー側）

- リクエスト : `GET /api/airports`
- 引数 : なし

#### 2. 参照テーブル・条件

- 参照テーブル : `airport`
- WHERE条件 : なし（全件）
- SORT : `airport_code` 昇順

#### 3. 出力（サーバー側➝クライアント側）

レスポンス : `List<AirportResponse>`

| 論理名 | フィールド名 | 型 | 元のカラム | 備考 |
|---|---|---|---|---|
| 空港コード | airportCode | String | airport_code | DTO作成O, X1検索リクエストの引数として使用 |
| 空港名 | name | String | name | DTO作成O, プルダウン表示（例: 福岡空港 (FUK)） |
| 都市名 | city | String | city | DTO作成O, プルダウン表示 |
| 登録日時 | － | － | created_at | DTO作成X, 監査用で画面に不要 |
| 更新日時 | － | － | updated_at | DTO作成X, 監査用で画面に不要 |


#### 4. 例外・境界

- 結果0件 : 200 + 空リスト（ErrorCodeなし）


### 共通 エラーレスポンス

- 形式 : 1件のオブジェクトで返す
  `{"code": "ER001", "message": "出発地・到着地を選択してください。"}`

| ErrorCode | HTTP | message |
|---|---|---|
| ER001 | 400 | 出発地・到着地を選択してください。 |
| ER002 | 400 | 出発地と到着地が同じです。 |


### X2 機能定義（航空便一覧・第1段階：片道・空港コードのみ）

- 機能 : X1で指定した出発地・到着地の航空便を、出発日時の昇順で一覧表示する
- 範囲外（次の段階で追加）: 便の選択（X3へ遷移）・残席数・運賃・出発日付・往復・人数
- 更新テーブル : なし（照会のみ）
- 新規API : なし（X1の `GET /api/flights` をそのまま使う）

#### 1. 画面遷移

- 画面URL : `/flights?departureAirport=FUK&arrivalAirport=HND`
- X1の検索ボタン : 入力チェックOKなら、APIは呼ばずに上記URLへ遷移するだけ（`useNavigate`）
- 検索条件はURLに残すので、ブラウザの戻る・ブックマーク・URL直接入力でも同じ結果を表示できる
- X2は表示時にURLから条件を取り出し（`useSearchParams`）、`GET /api/flights` を呼ぶ

#### 2. 入力（URL ➝ X2 ➝ サーバー側）

| 引数 | 取り出し元 | 検証 |
|---|---|---|
| departureAirport | URLクエリ | クライアントでは検証しない。サーバーの ER001・ER002 をそのまま表示する |
| arrivalAirport | URLクエリ | 同上 |

- URL直接入力で不正な値が来てもサーバーが検証するので、クライアント側の検証は重複させない

#### 3. 表示項目

| 論理名 | フィールド名 | 表示形式 |
|---|---|---|
| 検索条件 | departureAirport, arrivalAirport | `FUK ➝ HND`（URLの値） |
| 件数 | flights.length | `n件` |
| 便名 | flightNumber | そのまま |
| 出発空港 | departureAirport | そのまま |
| 到着空港 | arrivalAirport | そのまま |
| 出発日時 | departureAt | `yyyy/MM/dd HH:mm` |
| 到着日時 | arrivalAt | `yyyy/MM/dd HH:mm` |

- 並び順 : サーバーの返した順（departure_at 昇順）をそのまま使う

#### 4. 例外・境界

| ケース | 表示 |
|---|---|
| 結果0件 | I001 : 条件に合う航空便がありません。 |
| サーバー400（ER001・ER002） | レスポンスの `message` をそのまま表示 |
| 通信失敗（レスポンスなし） | E010 : 航空便一覧を読み込めませんでした。しばらくしてから再度お試しください。 |

#### 5. 実装メモ（フロント）

- 航空便の呼び出しは `features/flight` に移す（backendの `flight` ドメインと1:1）
  - `types.ts` : `FlightResponse`, `ErrorResponse`（home から移動）
  - `api.ts` : `fetchFlights()`（home から移動）
  - `hooks/useFlights.ts` : home から移動。X2表示時に呼ぶ
  - `pages/FlightList.tsx` : X2画面
  - `components/X2_FlightTable.tsx` : 一覧表
- `features/home` は空港（X0）だけを持ち、X1は遷移だけするので flight を import しない（features間import禁止を守る）
- `App.tsx` にルーティングを追加 : `/` ➝ Home（X1）, `/flights` ➝ FlightList（X2）
- X1の testUI（結果リスト・0件メッセージ・flightError）は X2 に移したら削除する
