import type { SeatInfo } from '../../../models/flight'
import { COLORS } from '../../../styles/colors'

interface SeatMapGridProps {
  seats: SeatInfo[]
  selected: string[]
  maxSelect: number
  onToggle: (seatNo: string) => void
}

export default function SeatMapGrid({ seats, selected, maxSelect, onToggle }: SeatMapGridProps) {
  const rows = Array.from(new Set(seats.map(s => s.row))).sort((a, b) => a - b)
  const cols = Array.from(new Set(seats.map(s => s.col))).sort()

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 24 }}>
      <div style={{
        textAlign: 'center', fontSize: '0.72rem', color: COLORS.textSub,
        border: `1px dashed ${COLORS.border}`, borderRadius: 8, padding: '8px 0', marginBottom: 20,
      }}>
        ✈ 기수 방향
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        {rows.map(row => (
          <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 20, fontSize: '0.68rem', color: COLORS.textFaint, textAlign: 'right' }}>{row}</span>
            {cols.map((col, i) => {
              const seat = seats.find(s => s.row === row && s.col === col)
              if (!seat) return <div key={col} style={{ width: 32 }} />
              const isSelected = selected.includes(seat.seatNo)
              const disabled = !seat.available || (!isSelected && selected.length >= maxSelect)
              return (
                <div key={col} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && (col === 'D' && cols.includes('C')) && <div style={{ width: 14 }} />}
                  <button
                    disabled={!seat.available}
                    onClick={() => !disabled && onToggle(seat.seatNo)}
                    title={seat.extraPrice > 0 ? `+${seat.extraPrice.toLocaleString()}원` : undefined}
                    style={{
                      width: 32, height: 32, borderRadius: 6,
                      fontSize: '0.62rem', fontWeight: 700,
                      cursor: seat.available ? 'pointer' : 'not-allowed',
                      border: isSelected ? `1px solid ${COLORS.amber}` : `1px solid ${COLORS.border}`,
                      background: !seat.available ? '#e5e7eb' : isSelected ? COLORS.amber : '#fff',
                      color: !seat.available ? COLORS.textFaint : isSelected ? '#000' : COLORS.text,
                      opacity: disabled && seat.available ? 0.4 : 1,
                    }}
                  >
                    {seat.col}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 24 }}>
        <Legend color="#fff" border={COLORS.border} label="선택 가능" />
        <Legend color={COLORS.amber} border={COLORS.amber} label="선택됨" />
        <Legend color="#e5e7eb" border={COLORS.border} label="이미 예약됨" />
      </div>
    </div>
  )
}

function Legend({ color, border, label }: { color: string; border: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 14, height: 14, borderRadius: 4, background: color, border: `1px solid ${border}` }} />
      <span style={{ fontSize: '0.7rem', color: COLORS.textSub }}>{label}</span>
    </div>
  )
}
