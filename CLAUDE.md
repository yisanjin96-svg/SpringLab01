## パッケージ構成
ドメイン単位でパッケージを分割する（レイヤー単位ではない）。

com.example.airline
├── common/       設定・共通例外・基底エンティティ
├── member/       会員
├── flight/       航空便・空港
└── reservation/  予約

各ドメインパッケージの内部構成:
  domain / repository / service / controller / dto

## パッケージ間ルール
- 他ドメインへの参照は domain と service までとする
- 他ドメインの repository を直接呼び出さない
- 新しいドメインを追加する場合、必ず上記5ディレクトリ構成に従う