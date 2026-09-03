interface PassengerBarProps {
  passengerId: number
  onChange: (id: number) => void
}

export default function PassengerBar({ passengerId, onChange }: PassengerBarProps) {
  return (
    <div style={{
      background: '#111', border: '1px solid #222', borderRadius: 6,
      padding: '12px 18px', marginBottom: 20,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ color: '#d97706', fontWeight: 700 }}>$</span>
      <label style={{ fontSize: '0.8rem', color: '#666' }}>passenger-id</label>
      <input
        type="number"
        value={passengerId}
        min={1}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          background: '#0a0a0a', border: '1px solid #333', borderRadius: 4,
          padding: '5px 10px', fontSize: '0.85rem', fontFamily: 'monospace',
          color: '#e5e5e5', width: 100, outline: 'none',
        }}
      />
      <small style={{ fontSize: '0.72rem', color: '#444' }}>
        # 이 ID로 탑승권이 발급됩니다
      </small>
    </div>
  )
}
