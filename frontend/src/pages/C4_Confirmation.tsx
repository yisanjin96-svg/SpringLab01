import { Link, useLocation } from 'react-router-dom'
import StepIndicator from '../components/airline/StepIndicator'
import { airportLabel, MOCK_FLIGHTS } from '../mock/mockData'
import type { FareOption, FlightOffer, PassengerInfo, SearchCriteria } from '../models/flight'
import { COLORS } from '../styles/colors'

interface LocationState {
  criteria?: SearchCriteria
  flight?: FlightOffer
  fare?: FareOption
  passengers?: PassengerInfo[]
  seats?: string[]
  pnr?: string
}

export default function C4_Confirmation() {
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  const flight = state.flight ?? MOCK_FLIGHTS[0]
  const fare = state.fare ?? flight.fares[0]
  const passengers = state.passengers ?? []
  const seats = state.seats ?? []
  const pnr = state.pnr ?? 'MOCK01'
  const total = fare.price * Math.max(passengers.length, 1)

  return (
    <div style={{ maxWidth: 700, margin: '32px auto', padding: '0 24px' }}>
      <StepIndicator current={5} />

      <div style={{
        background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10,
        padding: '32px 28px', textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: '#dcfce7',
          color: COLORS.success, fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          ✓
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.text, marginBottom: 6 }}>
          예약이 완료되었습니다
        </div>
        <div style={{ fontSize: '0.8rem', color: COLORS.textSub, marginBottom: 20 }}>
          예약 확인 이메일이 발송되었습니다 (목업 화면)
        </div>
        <div style={{
          display: 'inline-block', background: COLORS.bg, border: `1px dashed ${COLORS.border}`,
          borderRadius: 8, padding: '10px 24px',
        }}>
          <span style={{ fontSize: '0.7rem', color: COLORS.textSub, marginRight: 8 }}>예약번호(PNR)</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.navy, letterSpacing: '2px' }}>{pnr}</span>
        </div>
      </div>

      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 22 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>여정 정보</div>
        <Row label="구간" value={`${airportLabel(flight.outbound.originCode)} → ${airportLabel(flight.outbound.destinationCode)}`} />
        <Row label="편명" value={`${flight.outbound.flightNo} (${flight.outbound.departTime} - ${flight.outbound.arriveTime})`} />
        <Row label="운임" value={fare.fareName} />
        <Row label="탑승객" value={passengers.length > 0 ? passengers.map(p => `${p.familyName || 'HONG'}/${p.givenName || 'GILDONG'}`).join(', ') : '1명'} />
        <Row label="좌석" value={seats.length > 0 ? seats.join(', ') : '자동 배정'} />
        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text }}>총 결제금액</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.navy }}>{total.toLocaleString()}원</span>
        </div>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{
          width: '100%', background: COLORS.navy, color: '#fff', border: 'none',
          borderRadius: 8, padding: '13px 0', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginTop: 20,
        }}>
          홈으로
        </button>
      </Link>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontSize: '0.78rem', color: COLORS.textSub }}>{label}</span>
      <span style={{ fontSize: '0.78rem', color: COLORS.text, fontWeight: 600 }}>{value}</span>
    </div>
  )
}
