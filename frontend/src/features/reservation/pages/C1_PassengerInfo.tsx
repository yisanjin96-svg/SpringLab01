import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PassengerForm from '../components/PassengerForm'
import BookingSummaryPanel from '../components/BookingSummaryPanel'
import StepIndicator from '../../../components/StepIndicator'
import { DEFAULT_CRITERIA, MOCK_FLIGHTS } from '../../../mock/mockData'
import type { FareOption, FlightOffer, PassengerInfo, SearchCriteria } from '../../../models/flight'
import { COLORS } from '../../../styles/colors'

interface LocationState {
  criteria?: SearchCriteria
  flight?: FlightOffer
  fare?: FareOption
}

function emptyPassenger(id: string): PassengerInfo {
  return { id, type: 'ADULT', givenName: '', familyName: '', birthDate: '', gender: 'M', nationality: 'KR', passportNo: '' }
}

export default function C1_PassengerInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState

  const criteria = state.criteria ?? DEFAULT_CRITERIA
  const flight = state.flight ?? MOCK_FLIGHTS[0]
  const fare = state.fare ?? flight.fares[0]

  const count = Math.max(1, criteria.passengers.adult)
  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    Array.from({ length: count }, (_, i) => emptyPassenger(`p${i + 1}`))
  )

  const updatePassenger = (index: number, next: PassengerInfo) => {
    setPassengers(prev => prev.map((p, i) => (i === index ? next : p)))
  }

  const handleContinue = () => {
    navigate('/booking/seats', { state: { criteria, flight, fare, passengers } })
  }

  return (
    <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 24px' }}>
      <StepIndicator current={2} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
            탑승객 정보 입력
          </div>
          {passengers.map((p, i) => (
            <PassengerForm key={p.id} index={i} passenger={p} onChange={next => updatePassenger(i, next)} />
          ))}

          <button
            onClick={handleContinue}
            style={{
              width: '100%', background: COLORS.navy, color: '#fff', border: 'none',
              borderRadius: 8, padding: '13px 0', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginTop: 8,
            }}
          >
            좌석 선택으로 이동
          </button>
        </div>

        <BookingSummaryPanel flight={flight} fare={fare} passengerCount={count} />
      </div>
    </div>
  )
}
