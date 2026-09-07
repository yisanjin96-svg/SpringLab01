import { useState, type CSSProperties, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AIRPORTS } from '../../mock/mockData'
import type { CabinClass, SearchCriteria, TripType } from '../../models/flight'
import { COLORS } from '../../styles/colors'

const inputStyle: CSSProperties = {
  border: `1px solid ${COLORS.border}`,
  borderRadius: 6,
  padding: '10px 12px',
  fontSize: '0.85rem',
  color: COLORS.text,
  background: '#fff',
  outline: 'none',
}

function todayPlus(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function SearchWidget() {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState<TripType>('ROUND')
  const [originCode, setOriginCode] = useState('ICN')
  const [destinationCode, setDestinationCode] = useState('NRT')
  const [departDate, setDepartDate] = useState(todayPlus(7))
  const [returnDate, setReturnDate] = useState(todayPlus(10))
  const [adult, setAdult] = useState(1)
  const [cabinClass, setCabinClass] = useState<CabinClass>('ECONOMY')

  const swap = () => {
    setOriginCode(destinationCode)
    setDestinationCode(originCode)
  }

  const handleSearch = () => {
    const criteria: SearchCriteria = {
      tripType,
      originCode,
      destinationCode,
      departDate,
      returnDate: tripType === 'ROUND' ? returnDate : null,
      passengers: { adult, child: 0, infant: 0 },
      cabinClass,
    }
    navigate('/search', { state: { criteria } })
  }

  return (
    <div style={{
      background: COLORS.panel,
      borderRadius: 10,
      boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
      padding: '20px 24px',
      width: '100%',
      maxWidth: 920,
    }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        {(['ROUND', 'ONEWAY'] as TripType[]).map(t => (
          <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: COLORS.text, cursor: 'pointer' }}>
            <input type="radio" checked={tripType === t} onChange={() => setTripType(t)} />
            {t === 'ROUND' ? '왕복' : '편도'}
          </label>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr 1fr 1fr 1fr auto', gap: 10, alignItems: 'end' }}>
        <Field label="출발">
          <select style={inputStyle} value={originCode} onChange={e => setOriginCode(e.target.value)}>
            {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
          </select>
        </Field>

        <button
          onClick={swap}
          title="출발/도착 바꾸기"
          style={{
            border: `1px solid ${COLORS.border}`, background: '#fff', borderRadius: 6,
            width: 36, height: 36, cursor: 'pointer', color: COLORS.navy, fontWeight: 700,
          }}
        >
          ⇄
        </button>

        <Field label="도착">
          <select style={inputStyle} value={destinationCode} onChange={e => setDestinationCode(e.target.value)}>
            {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
          </select>
        </Field>

        <Field label="가는 날">
          <input type="date" style={inputStyle} value={departDate} onChange={e => setDepartDate(e.target.value)} />
        </Field>

        <Field label="오는 날">
          <input
            type="date" style={inputStyle} value={returnDate}
            disabled={tripType === 'ONEWAY'}
            onChange={e => setReturnDate(e.target.value)}
          />
        </Field>

        <Field label="좌석 등급">
          <select style={inputStyle} value={cabinClass} onChange={e => setCabinClass(e.target.value as CabinClass)}>
            <option value="ECONOMY">일반석</option>
            <option value="PRESTIGE">프레스티지</option>
            <option value="FIRST">일등석</option>
          </select>
        </Field>

        <Field label="인원">
          <select style={inputStyle} value={adult} onChange={e => setAdult(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>성인 {n}명</option>)}
          </select>
        </Field>
      </div>

      <button
        onClick={handleSearch}
        style={{
          marginTop: 18, width: '100%', background: COLORS.navy, color: '#fff',
          border: 'none', borderRadius: 8, padding: '13px 0',
          fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.3px',
        }}
      >
        항공편 조회
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>{label}</span>
      {children}
    </div>
  )
}
