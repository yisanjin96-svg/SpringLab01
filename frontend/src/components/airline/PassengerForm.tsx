import type { CSSProperties, ReactNode } from 'react'
import type { PassengerInfo } from '../../models/flight'
import { COLORS } from '../../styles/colors'

const inputStyle: CSSProperties = {
  border: `1px solid ${COLORS.border}`,
  borderRadius: 6,
  padding: '9px 10px',
  fontSize: '0.85rem',
  color: COLORS.text,
  outline: 'none',
  width: '100%',
}

const TYPE_LABEL: Record<string, string> = { ADULT: '성인', CHILD: '소아', INFANT: '유아' }

interface PassengerFormProps {
  index: number
  passenger: PassengerInfo
  onChange: (next: PassengerInfo) => void
}

export default function PassengerForm({ index, passenger, onChange }: PassengerFormProps) {
  const set = <K extends keyof PassengerInfo>(key: K, value: PassengerInfo[K]) =>
    onChange({ ...passenger, [key]: value })

  return (
    <div style={{
      background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10,
      padding: '18px 20px', marginBottom: 12,
    }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>
        탑승객 {index + 1} · {TYPE_LABEL[passenger.type]}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <Labeled label="성 (영문)">
          <input style={inputStyle} value={passenger.familyName} placeholder="HONG" onChange={e => set('familyName', e.target.value)} />
        </Labeled>
        <Labeled label="이름 (영문)">
          <input style={inputStyle} value={passenger.givenName} placeholder="GILDONG" onChange={e => set('givenName', e.target.value)} />
        </Labeled>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Labeled label="생년월일">
          <input type="date" style={inputStyle} value={passenger.birthDate} onChange={e => set('birthDate', e.target.value)} />
        </Labeled>
        <Labeled label="성별">
          <select style={inputStyle} value={passenger.gender} onChange={e => set('gender', e.target.value as 'M' | 'F')}>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </Labeled>
        <Labeled label="여권번호">
          <input style={inputStyle} value={passenger.passportNo} placeholder="M12345678" onChange={e => set('passportNo', e.target.value)} />
        </Labeled>
      </div>
    </div>
  )
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: '0.7rem', color: COLORS.textSub, fontWeight: 600 }}>{label}</span>
      {children}
    </div>
  )
}
