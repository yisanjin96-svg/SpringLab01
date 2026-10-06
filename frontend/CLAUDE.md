# フロントエンド

## スタック
React / TypeScript / Vite / axios

## ディレクトリ規約
- 機能単位で features/ 配下に分割する（backend のドメインパッケージと1:1）
- features 間の相互 import を禁止する
- 全機能共通のものだけ components/ に置く

## 型定義
- API の型はバックエンドの DTO クラス名と同一にする
- 型は各 feature の types.ts に置く
- any の使用を禁止する

## コンポーネント
- 1ファイル1コンポーネント。ファイル名 = コンポーネント名
- API呼び出しをコンポーネント内に直接書かない。hooks に切り出す
- コメントは日本語で書く

## 命名
- コンポーネント: PascalCase（SeatMap.tsx）
- hooks: use から始める（useFlightSearch.ts）
- API関数: 動詞から始める（searchFlights, createReservation）