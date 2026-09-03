import { useLocation, useNavigate } from 'react-router-dom'
import FlightResultCard from '../components/airline/FlightResultCard'
import { airportLabel, DEFAULT_CRITERIA, MOCK_FLIGHTS } from '../mock/mockData'
import type { SearchCriteria } from '../models/flight'
import { COLORS } from '../styles/colors'

export default function B1_SearchResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const criteria: SearchCriteria = (location.state as { criteria?: SearchCriteria })?.criteria ?? DEFAULT_CRITERIA

  const matched = MOCK_FLIGHTS.filter(
    f => f.outbound.originCode === criteria.originCode && f.outbound.destinationCode === criteria.destinationCode
  )
  const results = matched.length > 0 ? matched : MOCK_FLIGHTS

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', padding: '0 24px' }}>
      <div style={{
        background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10,
        padding: '16px 22px', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.text }}>
            {airportLabel(criteria.originCode)} → {airportLabel(criteria.destinationCode)}
          </div>
          <div style={{ fontSize: '0.78rem', color: COLORS.textSub, marginTop: 3 }}>
            {criteria.departDate}{criteria.returnDate ? ` ~ ${criteria.returnDate}` : ''} · 성인 {criteria.passengers.adult}명 · {criteria.tripType === 'ROUND' ? '왕복' : '편도'}
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent', border: `1px solid ${COLORS.navy}`, color: COLORS.navy,
            borderRadius: 6, padding: '8px 16px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
          }}
        >
          다시 검색
        </button>
      </div>

      {matched.length === 0 && (
        <p style={{ fontSize: '0.75rem', color: COLORS.textFaint, marginBottom: 14 }}>
          해당 구간의 목업 데이터가 없어 전체 노선 예시를 표시합니다.
        </p>
      )}

      <div style={{ fontSize: '0.75rem', color: COLORS.textSub, fontWeight: 600, marginBottom: 10 }}>
        총 {results.length}개 항공편
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {results.map(offer => <FlightResultCard key={offer.id} offer={offer} />)}
      </div>
    </div>
  )
}
