import type { FlightResponse } from '../types'

type Props = {
  flights: FlightResponse[]
}

// 「2026-10-01T09:00:00」➝「09:00」
function formatTime(value: string) {
  return value.slice(11, 16)
}

// 「2026-10-01T09:00:00」➝「10月1日(水)」
function formatDate(value: string) {
  const d = new Date(value)
  const week = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
  return `${d.getMonth() + 1}月${d.getDate()}日(${week})`
}

// 出発〜到着の所要時間「2時間30分」
function formatDuration(departureAt: string, arrivalAt: string) {
  const minutes = Math.round((new Date(arrivalAt).getTime() - new Date(departureAt).getTime()) / 60000)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}時間${m > 0 ? `${m}分` : ''}` : `${m}分`
}

/**
 * X2-01 航空便一覧（画面項目定義 No.4〜8）
 * クリーンアーキテクチャ 22章 : 受け取ったデータを表示するだけ（取得は hook の役割）
 */
export default function X2_FlightTable({ flights }: Props) {
  return (
    <ul className="flight-list">
      {flights.map((f, i) => {
        // 出発日が前の便と変わったら日付の見出しを出す
        const showDate = i === 0 || f.departureAt.slice(0, 10) !== flights[i - 1].departureAt.slice(0, 10)
        return (
          <li key={f.id}>
            {showDate && <h3 className="flight-date">{formatDate(f.departureAt)}</h3>}
            <div className="flight-card">
              <div className="flight-card-no">
                <span className="flight-airline">HOSHIMOTO AIR</span>
                <span className="flight-number">{f.flightNumber}</span>
              </div>

              <div className="flight-card-route">
                <div className="flight-point">
                  <span className="flight-time">{formatTime(f.departureAt)}</span>
                  <span className="flight-code">{f.departureAirport}</span>
                </div>

                <div className="flight-line">
                  <span className="flight-duration">{formatDuration(f.departureAt, f.arrivalAt)}</span>
                  <div className="flight-line-bar">
                    <span className="flight-plane">✈</span>
                  </div>
                  <span className="flight-direct">直行便</span>
                </div>

                <div className="flight-point">
                  <span className="flight-time">{formatTime(f.arrivalAt)}</span>
                  <span className="flight-code">{f.arrivalAirport}</span>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
