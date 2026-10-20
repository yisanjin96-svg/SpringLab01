import { useState } from 'react'
import C1_AirportSelect from './C1_AirportSelect'
// API
import { useAirports } from '../hooks/useAirports'
import { useNavigate } from 'react-router-dom'

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

export default function X1_FlightSearchBar() {
  
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
  
  /*
   * API : /api/airports 
   */ 
  const {airports, error} = useAirports()
  const navigate = useNavigate()
  const [inputError, setInputError] = useState<string | null>(null)
  
  // F2-01 : 到着地の一覧 : 出発地で選んだ空港は除く。（ER002予防）
    // 現在値が単一でセットしているdepartureではないことをFilterする。
    const arrivalAirports = airports.filter(airport => airport.airportCode !== departure)
    const departureAirports = airports.filter(airport => airport.airportCode !== arrival)
    // F2-02 : 出発（選択値）が === 到着地同じの場合、到着地(Arrival)の値を空にする。 
    // const handleDepatureSelect = (airportCode : string) => {
    //   // 「出発地」の値セットはこの変数(handleDepatureSelect)で行う。
    //   setDeparture(airportCode)
    //   if (airportCode === arrival)
    //     setArrival('')
    // }

    const handleSearch = () => {

      if (departure === '' || arrival === '') {
        setInputError('出発地・到着地を選択してください。')
        return
      }
      if (departure === arrival) {
        setInputError('出発地と到着地が同じです。')
        return
      }
      // 往路日は必須
      if (departureDate === '') {
        setInputError('往路日を選択してください。')
        return
      }
      // 往復のときだけ復路日も必須
      if (tripType === 'roundtrip' && returnDate === '') {
        setInputError('復路日を選択してください。')
        return
      }
    setInputError(null)
    
    // X2へ遷移するだけ（APIはX2が呼ぶ）。検索条件は全部URLに残す（specs X2）
    const params = new URLSearchParams({
      tripType,
      departureAirport: departure,
      arrivalAirport: arrival,
      departureDate,
      returnDate: tripType === 'roundtrip' ? returnDate : '',
      adults: String(adults),
      infants: String(infants),
    })
    navigate(`/flights?${params.toString()}`)
    }

  return (
    <div className="search-wrap">
      {/* 往復 / 片道 */}
      <div className="search-tabs">
        {/* X1-UI03 */}
        <button
          className={`search-tab ${tripType === 'roundtrip' ? 'active' : ''}`}
          onClick={() => setTripType('roundtrip')}
          >
          往復
        </button>
        {/* X1-UI04 説明 
        * 1) X1-UI04をクイックすると「TripType」がonewayになる
        * 2) 「tripType」が'oneway'の場合、UI08は非活性になる（disabled)
        */}
        <button
          className={`search-tab ${tripType === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripType('oneway')}
        >
          片道
        </button>
      </div>

      {/* 検索バー */}
      <div className="search-bar">
        <C1_AirportSelect label="出発地" airports={departureAirports} value={departure} onSelect={setDeparture} />

        <div className="search-divider" />

        <C1_AirportSelect label="到着地" airports={arrivalAirports} value={arrival} onSelect={setArrival} />

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
            <button className={`search-counter-btn ${adults === 1 ? 'disabled': ''}`} onClick={() => setAdults(v => Math.max(1, v - 1))} 
            disabled={adults === 1 || adults == infants} >
              −
            </button>
            <span className="search-counter-val">{adults}</span>
            <button className={`search-counter-btn ${adults >= 9 ? 'disabled': ''}`} onClick={() => setAdults(v => v + 1)}
              disabled={adults >= 9}>
              +
              </button>
          </div>
        </div>

        <div className="search-divider" />

        <div className="search-cell">
          <span className="search-label">幼児</span>
          <div className="search-counter">
            <button className={`search-counter-btn ${infants === 0 ? 'disabled' : ''}`} onClick={() => setInfants(v => Math.max(0, v - 1))} disabled={infants === 0}>−</button>
            <span className="search-counter-val">{infants}</span>
            <button className={`search-counter-btn ${infants === adults ? 'disabled' : ''}`} onClick={() => setInfants(v => v + 1)}
              disabled={infants === adults || infants + adults >= 9 }>
              +
            </button>
          </div>
        </div>

        <button className="search-submit-btn" onClick={handleSearch}>検索</button>
      </div>
      {/* ERROR表示 */}
      {error && <p>{error}</p>}
      {inputError && <p>{inputError}</p>}
    </div>
  )
}
