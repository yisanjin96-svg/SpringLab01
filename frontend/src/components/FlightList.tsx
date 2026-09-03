import type { Flight } from '../types'
import FlightCard from './FlightCard'

interface FlightListProps {
  flights: Flight[]
  passengerId: number
  onReserve: (id: number) => void
  onCancel: (id: number) => void
}

export default function FlightList({ flights, passengerId, onReserve, onCancel }: FlightListProps) {
  const available = flights.filter(f => !f.reserved).length

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 700, color: '#555',
          letterSpacing: '1px', textTransform: 'uppercase',
        }}>
          항공편 목록
        </span>
        <span style={{ fontSize: '0.72rem', color: '#444', fontFamily: 'monospace' }}>
          {available}/{flights.length} available
        </span>
      </div>

      {flights.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: '#555', textAlign: 'center', marginTop: 40 }}>
          운항 중인 항공편이 없습니다
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {flights.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              passengerId={passengerId}
              onReserve={onReserve}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
    </div>
  )
}
