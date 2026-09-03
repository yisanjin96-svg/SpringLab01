import type { FareOption, FlightOffer, SearchCriteria } from '../../models/flight'
import { COLORS } from '../../styles/colors'

const CABIN_LABEL: Record<string, string> = {
  ECONOMY: '일반석',
  PRESTIGE: '프레스티지',
  FIRST: '일등석',
}

interface FareTableProps {
  offer: FlightOffer
  criteria: SearchCriteria
  onSelect: (fare: FareOption) => void
}

export default function FareTable({ offer, onSelect }: FareTableProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {offer.fares.map(fare => (
        <div key={fare.id} style={{
          background: COLORS.panel,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, color: COLORS.navy,
              border: `1px solid ${COLORS.navy}`, borderRadius: 4, padding: '3px 8px',
            }}>
              {CABIN_LABEL[fare.cabinClass]}
            </span>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: COLORS.text }}>{fare.fareName}</div>
              <div style={{ fontSize: '0.72rem', color: COLORS.textSub, marginTop: 3 }}>
                수하물 {fare.baggageKg}kg · 마일리지 적립 {fare.mileagePercent}% · {fare.refundable ? '변경/환불 가능' : '변경/환불 불가'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.navy }}>
              {fare.price.toLocaleString()}원
            </span>
            <button
              onClick={() => onSelect(fare)}
              style={{
                background: COLORS.amber, color: '#000', border: 'none',
                padding: '9px 20px', borderRadius: 6,
                fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              선택하기
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
