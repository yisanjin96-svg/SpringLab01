import { useState } from 'react'

type TripType = 'roundtrip' | 'oneway'

export default function FlightSearchBar() {
  const [tripType, setTripType] = useState<TripType>('roundtrip')
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [infants, setInfants] = useState(0)

  return (
    <div className="search-wrap">
      {/* 왕복 / 편도 */}
      <div className="search-tabs">
        <button
          className={`search-tab ${tripType === 'roundtrip' ? 'active' : ''}`}
          onClick={() => setTripType('roundtrip')}
        >
          왕복
        </button>
        <button
          className={`search-tab ${tripType === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripType('oneway')}
        >
          편도
        </button>
      </div>

      {/* 검색 바 */}
      <div className="search-bar">
        <div className="search-cell">
          <span className="search-label">출발편</span>
          <input className="search-input" type="text" placeholder="출발 도시 / 공항" value={departure} onChange={e => setDeparture(e.target.value)} />
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">도착편</span>
          <input className="search-input" type="text" placeholder="도착 도시 / 공항" value={arrival} onChange={e => setArrival(e.target.value)} />
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">출발일</span>
          <input className="search-input" type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
        </div>

        <div className="search-divider" />

        <div className={`search-cell ${tripType === 'oneway' ? 'disabled' : ''}`}>
          <span className="search-label">도착일</span>
          <input className="search-input" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} disabled={tripType === 'oneway'} />
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">성인</span>
          <div className="search-counter">
            <button className="search-counter-btn" onClick={() => setAdults(v => Math.max(1, v - 1))}>−</button>
            <span className="search-counter-val">{adults}</span>
            <button className="search-counter-btn" onClick={() => setAdults(v => v + 1)}>+</button>
          </div>
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">유아</span>
          <div className="search-counter">
            <button className="search-counter-btn" onClick={() => setInfants(v => Math.max(0, v - 1))}>−</button>
            <span className="search-counter-val">{infants}</span>
            <button className="search-counter-btn" onClick={() => setInfants(v => v + 1)}>+</button>
          </div>
        </div>

        <button className="search-submit-btn">검색</button>
      </div>
    </div>
  )
}
