import X2_FlightTable from './X2_FlightTable'
import type { FlightResponse } from '../types'

// 往路・復路のひとつ分（見出し・件数・一覧・0件・エラー）を表示する
type Props = {
  title: string
  flights: FlightResponse[] | null
  error: string | null
}

export default function X2_FlightSection({ title, flights, error }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {/* 読み込み中 */}
      {!flights && !error && <p className="flight-message">航空便を検索しています…</p>}

      {/* 項目 No.3〜8 : 件数・一覧（0件・エラーのときは出さない） */}
      {flights && flights.length > 0 && (
        <>
          <p className="flight-count"><strong>{flights.length}</strong>件の航空便が見つかりました</p>
          <X2_FlightTable flights={flights} />
        </>
      )}

      {/* 項目 No.10 : メッセージ */}
      {flights && flights.length === 0 && (
        <div className="flight-empty">
          <span className="flight-empty-icon">✈</span>
          <p>条件に合う航空便がありません。</p>
        </div>
      )}
      {error && <p className="flight-message flight-error">{error}</p>}
    </section>
  )
}
