import { Link, useSearchParams } from 'react-router-dom'
import '../flight.css'
import X2_FlightSection from '../components/X2_FlightSection'
import { useFlights } from '../hooks/useFlights'

/**
 * X2 航空便一覧（specs X2）
 * 往復なら 往路（出発地➝到着地・往路日）と 復路（到着地➝出発地・復路日）の2回 GET /api/flights を呼ぶ。
 */
export default function FlightList() {
  // 項目 No.2 : URLクエリから条件を取り出す
  const [searchParams] = useSearchParams()
  const tripType = searchParams.get('tripType') ?? 'oneway'
  const departureAirport = searchParams.get('departureAirport') ?? ''
  const arrivalAirport = searchParams.get('arrivalAirport') ?? ''
  const departureDate = searchParams.get('departureDate') ?? ''
  const returnDate = searchParams.get('returnDate') ?? ''
  
  // tripTypeが 'roundtrip' true = isRoundtrip  
  const isRoundtrip = tripType === 'roundtrip'

  // 往路 : 出発地 ➝ 到着地
  const outbound = useFlights(departureAirport, arrivalAirport, departureDate)
  // 復路 : 空港を逆にして復路日で検索（片道なら日付を空にして呼ばない）
  const inbound = useFlights(arrivalAirport, departureAirport, isRoundtrip ? returnDate : '')

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
            <span className="flight-summary-label">{isRoundtrip ? '往復' : '片道'}</span>
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
        <X2_FlightSection title={`往路 ${departureDate}`} flights={outbound.flights} error={outbound.error} />
        {isRoundtrip && (
          <X2_FlightSection title={`復路 ${returnDate}`} flights={inbound.flights} error={inbound.error} />
        )}
      </main>
    </div>
  )
}
