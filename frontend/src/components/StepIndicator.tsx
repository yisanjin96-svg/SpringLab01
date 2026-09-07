import { COLORS } from '../styles/colors'

const STEPS = ['여정 선택', '탑승객 정보', '좌석 선택', '결제', '예약 완료']

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
      {STEPS.map((label, i) => {
        const step = i + 1
        const active = step === current
        const done = step < current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
                background: done ? COLORS.navy : active ? COLORS.amber : '#e5e7eb',
                color: done || active ? '#fff' : COLORS.textFaint,
              }}>
                {done ? '✓' : step}
              </div>
              <span style={{
                fontSize: '0.7rem', whiteSpace: 'nowrap',
                color: active ? COLORS.navy : COLORS.textFaint,
                fontWeight: active ? 700 : 500,
              }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: done ? COLORS.navy : COLORS.border, margin: '0 8px 18px' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
