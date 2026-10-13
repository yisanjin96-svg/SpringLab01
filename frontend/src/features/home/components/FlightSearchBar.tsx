import { useState } from 'react'
import AirportSelect from './AirportSelect'
// API
import { useAirports } from '../hooks/useAirports'


/* 仮（かり）データ：API（GET /api/airports）連携後に差し替える */
  // const DUMMY_AIRPORTS = [
  //   { airportCode: 'HND', name: '羽田空港', city: '東京' },
  //   { airportCode: 'FUK', name: '福岡空港', city: '福岡' },
  //   { airportCode: 'KIX', name: '関西国際空港', city: '大阪' },
  // ]

/* 
* ユニオン型 = Optionみたいな
* 'roundtrip'= 往復
* 'oneway'= 片道
*/ 
type TripType = 'roundtrip' | 'oneway'

export default function FlightSearchBar() {
  
  /*  
  * React Stateで データバインディングを行う。
  * UseStateの「Hook」でリアクトストアーを参照する。
  */
  const [tripType, setTripType] = useState<TripType>('roundtrip')
  const [departure, setDeparture] = useState('')   // 出発空港コード
  const [arrival, setArrival] = useState('')       // 到着空港コード
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [infants, setInfants] = useState(0)
  
  // useAirports()から
  const {airports, error} = useAirports()

  return (
    <div className="search-wrap">
      {/* 往復 / 片道 */}
      <div className="search-tabs">
        <button
          className={`search-tab ${tripType === 'roundtrip' ? 'active' : ''}`}
          onClick={() => setTripType('roundtrip')}
        >
          往復
        </button>
        <button
          className={`search-tab ${tripType === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripType('oneway')}
        >
          片道
        </button>
      </div>

      {/* 検索バー */}
      <div className="search-bar">
        <AirportSelect label="出発地" airports={airports} value={departure} onSelect={setDeparture} />

        <div className="search-divider" />

        <AirportSelect label="到着地" airports={airports} value={arrival} onSelect={setArrival} />

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">往路日</span>
          <input className="search-input" type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
        </div>

        <div className="search-divider" />

        <div className={`search-cell ${tripType === 'oneway' ? 'disabled' : ''}`}>
          <span className="search-label">復路日</span>
          <input className="search-input" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} disabled={tripType === 'oneway'} />
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">大人</span>
          <div className="search-counter">
            <button className="search-counter-btn" onClick={() => setAdults(v => Math.max(1, v - 1))}>−</button>
            <span className="search-counter-val">{adults}</span>
            <button className="search-counter-btn" onClick={() => setAdults(v => v + 1)}>+</button>
          </div>
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">幼児</span>
          <div className="search-counter">
            <button className="search-counter-btn" onClick={() => setInfants(v => Math.max(0, v - 1))}>−</button>
            <span className="search-counter-val">{infants}</span>
            <button className="search-counter-btn" onClick={() => setInfants(v => v + 1)}>+</button>
          </div>
        </div>

        <button className="search-submit-btn">検索</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}
