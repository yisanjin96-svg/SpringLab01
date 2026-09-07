import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SeatMapGrid from '../components/SeatMapGrid'
import BookingSummaryPanel from '../components/BookingSummaryPanel'
import StepIndicator from '../../../components/StepIndicator'
import { computeSeatExtraFee, DEFAULT_CRITERIA, generateSeatMap, MOCK_FLIGHTS } from '../../../mock/mockData'
import type { FareOption, FlightOffer, PassengerInfo, SearchCriteria } from '../../../models/flight'
import { COLORS } from '../../../styles/colors'

interface LocationState {
  criteria?: SearchCriteria
  flight?: FlightOffer
  fare?: FareOption
  passengers?: PassengerInfo[]
}

export default function C2_SeatSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  const criteria = state.criteria ?? DEFAULT_CRITERIA
  const flight = state.flight ?? MOCK_FLIGHTS[0]
  const fare = state.fare ?? flight.fares[0]
  const passengers = state.passengers ?? [{ id: 'p1' } as PassengerInfo]

  const cabinClass = fare.cabinClass === 'FIRST' ? 'PRESTIGE' : fare.cabinClass
  const seats = generateSeatMap(cabinClass)
  const maxSelect = passengers.length

  const [selected, setSelected] = useState<string[]>([])

  const toggle = (seatNo: string) => {
    setSelected(prev => prev.includes(seatNo) ? prev.filter(s => s !== seatNo) : [...prev, seatNo])
  }

  const extraFee = computeSeatExtraFee(cabinClass, selected)

  const handleContinue = () => {
    navigate('/booking/payment', { state: { criteria, flight, fare, passengers, seats: selected } })
  }

  return (
    <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 24px' }}>
      <StepIndicator current={3} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
            좌석 선택
          </div>
          <div style={{ fontSize: '0.75rem', color: COLORS.textSub, marginBottom: 12 }}>
            탑승객 {maxSelect}명의 좌석 {selected.length}/{maxSelect}석 선택됨
          </div>

          <SeatMapGrid seats={seats} selected={selected} maxSelect={maxSelect} onToggle={toggle} />

          <button
            disabled={selected.length !== maxSelect}
            onClick={handleContinue}
            style={{
              width: '100%', background: selected.length === maxSelect ? COLORS.navy : '#cbd5e1',
              color: '#fff', border: 'none', borderRadius: 8, padding: '13px 0',
              fontSize: '0.9rem', fontWeight: 700,
              cursor: selected.length === maxSelect ? 'pointer' : 'not-allowed', marginTop: 16,
            }}
          >
            결제 정보 입력으로 이동
          </button>
        </div>

        <BookingSummaryPanel flight={flight} fare={fare} passengerCount={maxSelect} seatCount={selected.length} extraFee={extraFee} />
      </div>
    </div>
  )
}
