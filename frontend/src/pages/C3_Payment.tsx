import { useState, type CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingSummaryPanel from '../components/airline/BookingSummaryPanel'
import StepIndicator from '../components/airline/StepIndicator'
import { computeSeatExtraFee, DEFAULT_CRITERIA, MOCK_FLIGHTS } from '../mock/mockData'
import type { FareOption, FlightOffer, PassengerInfo, SearchCriteria } from '../models/flight'
import { COLORS } from '../styles/colors'

interface LocationState {
  criteria?: SearchCriteria
  flight?: FlightOffer
  fare?: FareOption
  passengers?: PassengerInfo[]
  seats?: string[]
}

const inputStyle: CSSProperties = {
  border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '9px 10px',
  fontSize: '0.85rem', color: COLORS.text, outline: 'none', width: '100%',
}

function generatePnr(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function C3_Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  const criteria = state.criteria ?? DEFAULT_CRITERIA
  const flight = state.flight ?? MOCK_FLIGHTS[0]
  const fare = state.fare ?? flight.fares[0]
  const passengers = state.passengers ?? [{ id: 'p1' } as PassengerInfo]
  const seats = state.seats ?? []

  const cabinClass = fare.cabinClass === 'FIRST' ? 'PRESTIGE' : fare.cabinClass
  const extraFee = computeSeatExtraFee(cabinClass, seats)

  const [cardHolder, setCardHolder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [installment, setInstallment] = useState(0)
  const [agreed, setAgreed] = useState(false)

  const canSubmit = cardHolder && cardNumber && expiry && agreed

  const handlePay = () => {
    const payment = { method: 'CARD' as const, cardHolder, cardNumber, expiry, installment }
    navigate('/booking/complete', {
      state: { criteria, flight, fare, passengers, seats, payment, pnr: generatePnr(), bookedAt: new Date().toISOString() },
    })
  }

  return (
    <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 24px' }}>
      <StepIndicator current={4} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
            결제 정보 입력
          </div>

          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
              <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>카드 소유자명</span>
              <input style={inputStyle} value={cardHolder} placeholder="HONG GILDONG" onChange={e => setCardHolder(e.target.value)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
              <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>카드 번호</span>
              <input style={inputStyle} value={cardNumber} placeholder="0000-0000-0000-0000" onChange={e => setCardNumber(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>유효기간 (MM/YY)</span>
                <input style={inputStyle} value={expiry} placeholder="09/28" onChange={e => setExpiry(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>할부</span>
                <select style={inputStyle} value={installment} onChange={e => setInstallment(Number(e.target.value))}>
                  <option value={0}>일시불</option>
                  {[2, 3, 6, 12].map(n => <option key={n} value={n}>{n}개월</option>)}
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: COLORS.textSub }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              운임 규정 및 개인정보 처리 방침에 동의합니다 (목업)
            </label>
          </div>

          <button
            disabled={!canSubmit}
            onClick={handlePay}
            style={{
              width: '100%', background: canSubmit ? COLORS.amber : '#cbd5e1', color: '#000',
              border: 'none', borderRadius: 8, padding: '13px 0', fontSize: '0.9rem', fontWeight: 700,
              cursor: canSubmit ? 'pointer' : 'not-allowed', marginTop: 16,
            }}
          >
            결제하기
          </button>
        </div>

        <BookingSummaryPanel flight={flight} fare={fare} passengerCount={passengers.length} seatCount={seats.length} extraFee={extraFee} />
      </div>
    </div>
  )
}
