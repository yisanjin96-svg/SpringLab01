# SpringLab01

予約システムを作って同時性を学ぶ。

1. pakage.domain.Facility (26.08.09)
    - 施設オブジェクトに対してSetterのみで不便オブジェクトにする。
    - オブジェクト（施設）を生成すると、その情報が変更されるのを塞ぐ為。
2. pakage.domain.slot (26.08.09)
    - 楽観的ロック
    - @versionアノテーションにして、HibernateがWhere version = 読んだ値 にする。
    - Aのクエリが成功すればversion=1にする、BとかCがverson = 0 にすれば
    - OptimisticLockException例外に引っかかる、同時性の措置を講じる
   