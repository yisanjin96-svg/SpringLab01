import type { Flight } from '../types'

const BASE = '/api/slots'

export async function fetchFlights(): Promise<Flight[]> {
  const start = new Date()
  const end = new Date()
  end.setDate(end.getDate() + 7)
  const params = new URLSearchParams({
    start: start.toISOString().slice(0, 19),
    end: end.toISOString().slice(0, 19),
  })
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('항공편 조회 실패')
  return res.json()
}

export async function reserveFlight(flightId: number, passengerId: number): Promise<void> {
  const res = await fetch(`${BASE}/${flightId}/reserve?userId=${passengerId}`, { method: 'POST' })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || '예약 실패')
  }
}

export async function cancelFlight(flightId: number, passengerId: number): Promise<void> {
  const res = await fetch(`${BASE}/${flightId}/cancel?userId=${passengerId}`, { method: 'POST' })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || '취소 실패')
  }
}
