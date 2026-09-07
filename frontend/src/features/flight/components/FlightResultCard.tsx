import { useNavigate } from 'react-router-dom'
import type { FlightOffer } from '../../../models/flight'
import { COLORS } from '../../../styles/colors'

export default function FlightResultCard({ offer }: { offer: FlightOffer }) {
  const navigate = useNavigate()
  const lowest = Math.min(...offer.fares.map(f => f.price))
  const seg = offer.outbound

  return (
    <div style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: '18px 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: COLORS.textSub, fontWeight: 600 }}>{seg.flightNo}</div>
          <div style={{ fontSize: '0.72rem', color: COLORS.textFaint }}>{seg.aircraft}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: COLORS.text }}>{seg.departTime}</div>
          <div style={{ fontSize: '0.72rem', color: COLORS.textSub }}>{seg.originCode}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 100 }}>
          <span style={{ fontSize: '0.68rem', color: COLORS.textFaint }}>{seg.duration}</span>
          <div style={{ width: '100%', height: 1, background: COLORS.border, position: 'relative' }}>
            <span style={{ position: 'absolute', right: -4, top: -5, color: COLORS.textFaint, fontSize: '0.7rem' }}>✈</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: COLORS.textFaint }}>
            {seg.stops === 0 ? '직항' : `경유 ${seg.stops}회`}
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: COLORS.text }}>{seg.arriveTime}</div>
          <div style={{ fontSize: '0.72rem', color: COLORS.textSub }}>{seg.destinationCode}</div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.68rem', color: COLORS.textSub, marginBottom: 2 }}>일반석 최저가</div>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: COLORS.navy, marginBottom: 10 }}>
          {lowest.toLocaleString()}원
        </div>
        <button
          onClick={() => navigate(`/flights/${offer.id}`)}
          style={{
            background: COLORS.amber, color: '#000', border: 'none',
            padding: '9px 22px', borderRadius: 6,
            fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          선택
        </button>
      </div>
    </div>
  )
}
