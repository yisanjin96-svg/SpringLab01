import { useEffect, useState } from 'react'
import { fetchFlights, reserveFlight, cancelFlight } from '../../api/slots'
import { fetchServerStatus } from '../../api/main'
import type { Flight } from '../../types'
import Header from '../../components/Header'
import PassengerBar from '../../components/PassengerBar'
import FlightList from '../../components/FlightList'
import Toast from '../../components/Toast'

interface ToastState {
  message: string
  ok: boolean
}

export default function LockDemoPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [passengerId, setPassengerId] = useState(1001)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [serverStatus, setServerStatus] = useState('연결 중...')

  const load = async () => {
    try {
      setFlights(await fetchFlights())
    } catch (e) {
      notify((e as Error).message, false)
    } finally {
      setLoading(false)
    }
  }

  const notify = (message: string, ok: boolean) => {
    setToast({ message, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleReserve = async (flightId: number) => {
    try {
      await reserveFlight(flightId, passengerId)
      notify('탑승권이 발급되었습니다', true)
      load()
    } catch (e) {
      notify((e as Error).message, false)
    }
  }

  const handleCancel = async (flightId: number) => {
    try {
      await cancelFlight(flightId, passengerId)
      notify('예약이 취소되었습니다', true)
      load()
    } catch (e) {
      notify((e as Error).message, false)
    }
  }

  useEffect(() => {
    load()
    fetchServerStatus()
      .then(setServerStatus)
      .catch(() => setServerStatus('서버 오프라인'))
  }, [])

  return (
    <div style={{
      fontFamily: "'SF Mono','Fira Code','Cascadia Code',monospace",
      background: '#0a0a0a',
      color: '#e5e5e5',
      minHeight: '100vh',
    }}>
      <Header serverStatus={serverStatus} />

      <main style={{ maxWidth: 900, margin: '32px auto', padding: '0 24px' }}>
        {toast && <Toast message={toast.message} ok={toast.ok} />}

        <PassengerBar passengerId={passengerId} onChange={setPassengerId} />

        {loading ? (
          <p style={{ fontSize: '0.85rem', color: '#555', textAlign: 'center', marginTop: 40 }}>
            항공편 조회 중...
          </p>
        ) : (
          <FlightList
            flights={flights}
            passengerId={passengerId}
            onReserve={handleReserve}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  )
}
