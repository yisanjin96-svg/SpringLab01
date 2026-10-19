import { Link, useSearchParams } from 'react-router-dom'
import '../flight.css'
import X2_FlightTable from '../components/X2_FlightTable'
import { useFlights } from '../hooks/useFlights'

/**
 * X2 航空便一覧（specs X2）
 * URLの条件で GET /api/flights を呼び、結果を一覧表示する。
 */
export default function FlightList() {
  // 項目 No.2 : URLクエリ（/flights?departureAirport=FUK&arrivalAirport=HND）から条件を取り出す
  const [searchParams] = useSearchParams()
  const departureAirport = searchParams.get('departureAirport') ?? ''
  const arrivalAirport = searchParams.get('arrivalAirport') ?? ''

  const { flights, error } = useFlights(departureAirport, arrivalAirport)

  return (
    <div className="flight-page">
      <header className="flight-header">
        {/* 項目 No.1 : ロゴ ➝ X1 */}
        <Link to="/" className="flight-logo">HOSHIMOTO AIR</Link>
      </header>

      {/* 検索条件バー */}
      <section className="flight-summary">
        <div className="flight-summary-inner">
          <div className="flight-summary-route">
            <span className="flight-summary-label">片道</span>
            {/* 項目 No.2 : 検索条件 */}
            <span className="flight-route">
              {departureAirport}<span className="flight-route-arrow">✈</span>{arrivalAirport}
            </span>
          </div>
          {/* 項目 No.9 : 検索条件を変更 ➝ X1 */}
          <Link to="/" className="flight-back-btn">検索条件を変更</Link>
        </div>
      </section>

      <main className="flight-main">
        {/* 読み込み中 */}
        {!flights && !error && <p className="flight-message">航空便を検索しています…</p>}

        {/* 項目 No.3 : 件数（0件・エラーのときは出さない） */}
        {flights && flights.length > 0 && (
          <p className="flight-count"><strong>{flights.length}</strong>件の航空便が見つかりました</p>
        )}

        {/* 項目 No.4〜8 : 一覧 */}
        {flights && flights.length > 0 && <X2_FlightTable flights={flights} />}

        {/* 項目 No.10 : メッセージ */}
        {flights && flights.length === 0 && (
          <div className="flight-empty">
            <span className="flight-empty-icon">✈</span>
            <p>条件に合う航空便がありません。</p>
            <Link to="/" className="flight-back-btn">検索条件を変更</Link>
          </div>
        )}
        {error && <p className="flight-message flight-error">{error}</p>}
      </main>
    </div>
  )
}
