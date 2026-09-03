import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FareTable from '../components/airline/FareTable'
import { airportLabel, DEFAULT_CRITERIA, findFlightById } from '../mock/mockData'
import type { FareOption, SearchCriteria } from '../models/flight'
import { COLORS } from '../styles/colors'

export default function B2_FlightDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const criteria: SearchCriteria = (location.state as { criteria?: SearchCriteria })?.criteria ?? DEFAULT_CRITERIA

  const offer = findFlightById(id ?? '')

  if (!offer) {
    return (
      <div style={{ maxWidth: 700, margin: '60px auto', textAlign: 'center' }}>
        <p style={{ color: COLORS.textSub, marginBottom: 16 }}>해당 항공편을 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/search', { state: { criteria } })} style={{
          background: COLORS.navy, color: '#fff', border: 'none', borderRadius: 6,
          padding: '10px 20px', cursor: 'pointer',
        }}>
          조회 결과로 돌아가기
        </button>
      </div>
    )
  }

  const handleSelectFare = (fare: FareOption) => {
    navigate('/booking/passengers', { state: { criteria, flight: offer, fare } })
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', padding: '0 24px' }}>
      <div style={{
        background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10,
        padding: '18px 22px', marginBottom: 20,
      }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: COLORS.text }}>
          {airportLabel(offer.outbound.originCode)} → {airportLabel(offer.outbound.destinationCode)}
        </div>
        <div style={{ fontSize: '0.8rem', color: COLORS.textSub, marginTop: 4 }}>
          {offer.outbound.flightNo} · {offer.outbound.departTime} - {offer.outbound.arriveTime} ({offer.outbound.duration}) · {offer.outbound.aircraft}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
        운임 선택
      </div>
      <FareTable offer={offer} criteria={criteria} onSelect={handleSelectFare} />
    </div>
  )
}
