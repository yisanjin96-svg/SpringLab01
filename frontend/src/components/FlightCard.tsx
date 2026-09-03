import type { Flight } from '../types'

interface FlightCardProps {
  flight: Flight
  passengerId: number
  onReserve: (id: number) => void
  onCancel: (id: number) => void
}

export default function FlightCard({ flight, passengerId, onReserve, onCancel }: FlightCardProps) {
  const mine = flight.reserved && flight.reservedBy === passengerId

  return (
    <div style={{
      background: '#111',
      border: '1px solid #2a2a2a',
      borderLeft: `3px solid ${mine ? '#d97706' : flight.reserved ? '#333' : '#166534'}`,
      borderRadius: 6,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: flight.reserved && !mine ? 0.55 : 1,
    }}>

      {/* 왼쪽: 항공편 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{
          background: '#1a1a1a', border: '1px solid #333',
          color: '#d97706', fontSize: '0.72rem', fontWeight: 700,
          padding: '3px 10px', borderRadius: 4, letterSpacing: '0.5px',
        }}>
          {flight.facilityName}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#555', marginBottom: 2 }}>DEP</div>
            <div style={{ fontSize: '0.9rem', color: '#e5e5e5', fontWeight: 600 }}>
              {flight.startTimeFormatted}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '0 8px' }}>
            <div style={{ fontSize: '0.6rem', color: '#444' }}>✈</div>
            <div style={{ width: 48, height: 1, background: '#333' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#555', marginBottom: 2 }}>ARR</div>
            <div style={{ fontSize: '0.9rem', color: '#e5e5e5', fontWeight: 600 }}>
              {flight.endTimeFormatted}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 상태 + 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: '0.68rem', color: '#444', fontFamily: 'monospace' }}>
          v{flight.version}
        </span>

        {flight.reserved && (
          <span style={{ fontSize: '0.72rem', color: '#555', fontFamily: 'monospace' }}>
            pax:{flight.reservedBy}
          </span>
        )}

        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: mine ? '#d97706' : flight.reserved ? '#2a2a2a' : '#22c55e',
          boxShadow: !flight.reserved ? '0 0 6px #22c55e88' : mine ? '0 0 6px #d9770688' : 'none',
        }} />

        {!flight.reserved && (
          <button
            onClick={() => onReserve(flight.id)}
            style={{
              background: '#d97706', color: '#000', border: 'none',
              padding: '6px 16px', borderRadius: 5,
              fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace', cursor: 'pointer',
            }}
          >
            발권하기
          </button>
        )}

        {flight.reserved && mine && (
          <button
            onClick={() => onCancel(flight.id)}
            style={{
              background: 'transparent', color: '#d97706', border: '1px solid #d97706',
              padding: '6px 16px', borderRadius: 5,
              fontSize: '0.8rem', fontFamily: 'monospace', cursor: 'pointer',
            }}
          >
            취소하기
          </button>
        )}

        {flight.reserved && !mine && (
          <button
            disabled
            style={{
              background: 'transparent', color: '#444', border: '1px solid #2a2a2a',
              padding: '6px 16px', borderRadius: 5,
              fontSize: '0.8rem', fontFamily: 'monospace', cursor: 'not-allowed',
            }}
          >
            마감
          </button>
        )}
      </div>
    </div>
  )
}
