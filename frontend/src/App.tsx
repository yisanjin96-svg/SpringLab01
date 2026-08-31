import { useEffect, useState } from 'react'

// SlotDto (Java: SlotDto.java) — Lazy 문제 해결을 위해 DTO로 반환
interface Slot {
  id: number
  facilityName: string
  startTimeFormatted: string
  endTimeFormatted: string
  reserved: boolean
  reservedBy: number | null
  version: number
}

const BASE = '/api/slots'

async function fetchSlots(): Promise<Slot[]> {
  const start = new Date()
  const end = new Date()
  end.setDate(end.getDate() + 7)
  const params = new URLSearchParams({
    start: start.toISOString().slice(0, 19),
    end: end.toISOString().slice(0, 19),
  })
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('슬롯 조회 실패')
  return res.json()
}

async function connetServer(): Promise<string> {
  const res = await fetch('/api/main')
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'off Server')
  }
  return res.text()   // 백엔드가 plain String을 반환하므로 .text()로 읽음
}

async function reserve(slotId: number, userId: number) {
  const res = await fetch(`${BASE}/${slotId}/reserve?userId=${userId}`, { method: 'POST' })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || '예약 실패')
  }
}

async function cancel(slotId: number, userId: number) {
  const res = await fetch(`${BASE}/${slotId}/cancel?userId=${userId}`, { method: 'POST' })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || '취소 실패')
  }
}

export default function App() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [userId, setUserId] = useState(1001)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [serverMsg, setServerMsg] = useState('연결 중...')

  const load = async () => {
    try {
      setSlots(await fetchSlots())
    } catch (e) {
      notify((e as Error).message, false)
    } finally {
      setLoading(false)
    }
  }

  const notify = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleReserve = async (slotId: number) => {
    try {
      await reserve(slotId, userId)
      notify('예약 완료', true)
      load()
    } catch (e) {
      notify((e as Error).message, false)
    }
  }

  const handleCancel = async (slotId: number) => {
    try {
      await cancel(slotId, userId)
      notify('예약 취소 완료', true)
      load()
    } catch (e) {
      notify((e as Error).message, false)
    }
  }

  useEffect(() => {
    load()
    connetServer()
      .then(msg => setServerMsg(msg))
      .catch(() => setServerMsg('서버 오프라인'))
  }, [])

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.logo}>♡</div>
        <span style={styles.logoText}>loveMyself</span>
        <span style={styles.sep}>/</span>
        <span style={styles.subtitle}>시설 예약</span>
        <span style={styles.serverMsg}>{serverMsg}</span>
        <span style={styles.badge}>낙관적 락 학습용</span>
      </header>

      <main style={styles.main}>
        {toast && (
          <div style={{ ...styles.toast, borderLeftColor: toast.ok ? '#22c55e' : '#ef4444' }}>
            <span style={{ color: toast.ok ? '#86efac' : '#fca5a5' }}>
              {toast.ok ? '✓' : '✗'}
            </span>
            {' '}{toast.msg}
          </div>
        )}

        <div style={styles.userBar}>
          <span style={styles.prompt}>$</span>
          <label style={styles.label}>user-id</label>
          <input
            type="number"
            value={userId}
            min={1}
            onChange={e => setUserId(Number(e.target.value))}
            style={styles.input}
          />
          <small style={styles.hint}># 예약 시 이 ID로 요청됩니다</small>
        </div>

        <div style={styles.listHeader}>
          <span style={styles.listTitle}>예약 가능 슬롯</span>
          <span style={styles.listCount}>
            {slots.filter(s => !s.reserved).length}/{slots.length} available
          </span>
        </div>

        {loading ? (
          <p style={styles.empty}>로딩 중...</p>
        ) : slots.length === 0 ? (
          <p style={styles.empty}>슬롯이 없습니다</p>
        ) : (
          <div style={styles.list}>
            {slots.map(slot => {
              const mine = slot.reserved && slot.reservedBy === userId
              return (
                <div
                  key={slot.id}
                  style={{
                    ...styles.card,
                    borderLeftColor: mine ? '#d97706' : slot.reserved ? '#333' : '#166534',
                    opacity: slot.reserved && !mine ? 0.6 : 1,
                  }}
                >
                  <div style={styles.cardLeft}>
                    <span style={styles.facility}>{slot.facilityName}</span>
                    <span style={styles.time}>
                      {slot.startTimeFormatted}
                      <span style={styles.arrow}> → </span>
                      {slot.endTimeFormatted}
                    </span>
                  </div>

                  <div style={styles.cardRight}>
                    <span style={styles.version}>v{slot.version}</span>
                    {slot.reserved && (
                      <span style={styles.uid}>uid:{slot.reservedBy}</span>
                    )}
                    <div style={{
                      ...styles.dot,
                      background: mine ? '#d97706' : slot.reserved ? '#333' : '#22c55e',
                      boxShadow: !slot.reserved ? '0 0 6px #22c55e88' : mine ? '0 0 6px #d9770688' : 'none',
                    }} />
                    {!slot.reserved && (
                      <button style={styles.btnPrimary} onClick={() => handleReserve(slot.id)}>
                        예약하기
                      </button>
                    )}
                    {slot.reserved && mine && (
                      <button style={styles.btnOutline} onClick={() => handleCancel(slot.id)}>
                        취소하기
                      </button>
                    )}
                    {slot.reserved && !mine && (
                      <button style={styles.btnDisabled} disabled>
                        예약됨
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

const styles = {
  root: {
    fontFamily: "'SF Mono','Fira Code','Cascadia Code',monospace",
    background: '#0a0a0a',
    color: '#e5e5e5',
    minHeight: '100vh',
  } as React.CSSProperties,
  header: {
    background: '#0a0a0a',
    borderBottom: '1px solid #222',
    padding: '14px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } as React.CSSProperties,
  logo: {
    width: 28, height: 28,
    background: 'linear-gradient(135deg,#d97706,#f59e0b)',
    borderRadius: 6,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, color: '#000',
  } as React.CSSProperties,
  logoText: { fontSize: '0.95rem', fontWeight: 600, color: '#e5e5e5' } as React.CSSProperties,
  sep: { color: '#333' } as React.CSSProperties,
  subtitle: { fontSize: '0.85rem', color: '#888' } as React.CSSProperties,
  serverMsg: { fontSize: '0.75rem', color: '#22c55e', fontFamily: 'monospace' } as React.CSSProperties,
  badge: {
    marginLeft: 'auto',
    background: '#1a1a00', border: '1px solid #d97706',
    color: '#d97706', fontSize: '0.68rem', padding: '2px 8px',
    borderRadius: 4, fontWeight: 600, letterSpacing: '0.5px',
  } as React.CSSProperties,
  main: { maxWidth: 860, margin: '32px auto', padding: '0 24px' } as React.CSSProperties,
  toast: {
    background: '#111', border: '1px solid #222',
    borderLeft: '3px solid', borderRadius: 5,
    padding: '10px 16px', marginBottom: 20,
    fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8,
  } as React.CSSProperties,
  userBar: {
    background: '#111', border: '1px solid #222', borderRadius: 6,
    padding: '12px 18px', marginBottom: 20,
    display: 'flex', alignItems: 'center', gap: 12,
  } as React.CSSProperties,
  prompt: { color: '#d97706', fontWeight: 700 } as React.CSSProperties,
  label: { fontSize: '0.8rem', color: '#666' } as React.CSSProperties,
  input: {
    background: '#0a0a0a', border: '1px solid #333', borderRadius: 4,
    padding: '5px 10px', fontSize: '0.85rem', fontFamily: 'monospace',
    color: '#e5e5e5', width: 100, outline: 'none',
  } as React.CSSProperties,
  hint: { fontSize: '0.72rem', color: '#444' } as React.CSSProperties,
  listHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 10,
  } as React.CSSProperties,
  listTitle: {
    fontSize: '0.72rem', fontWeight: 700, color: '#555',
    letterSpacing: '1px', textTransform: 'uppercase' as const,
  },
  listCount: { fontSize: '0.72rem', color: '#444' } as React.CSSProperties,
  empty: { fontSize: '0.85rem', color: '#555', textAlign: 'center' } as React.CSSProperties,
  list: { display: 'flex', flexDirection: 'column', gap: 6 } as React.CSSProperties,
  card: {
    background: '#111', border: '1px solid #2a2a2a',
    borderLeft: '3px solid', borderRadius: 6,
    padding: '14px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  } as React.CSSProperties,
  cardLeft: { display: 'flex', alignItems: 'center', gap: 16 } as React.CSSProperties,
  facility: {
    background: '#1a1a1a', border: '1px solid #333',
    color: '#d97706', fontSize: '0.72rem', fontWeight: 700,
    padding: '3px 8px', borderRadius: 4,
  } as React.CSSProperties,
  time: { fontSize: '0.88rem', color: '#ccc' } as React.CSSProperties,
  arrow: { color: '#555' } as React.CSSProperties,
  cardRight: { display: 'flex', alignItems: 'center', gap: 14 } as React.CSSProperties,
  version: { fontSize: '0.68rem', color: '#444' } as React.CSSProperties,
  uid: { fontSize: '0.75rem', color: '#555' } as React.CSSProperties,
  dot: { width: 6, height: 6, borderRadius: '50%' } as React.CSSProperties,
  btnPrimary: {
    background: '#d97706', color: '#000', border: 'none',
    padding: '6px 16px', borderRadius: 5,
    fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace', cursor: 'pointer',
  } as React.CSSProperties,
  btnOutline: {
    background: 'transparent', color: '#d97706', border: '1px solid #d97706',
    padding: '6px 16px', borderRadius: 5,
    fontSize: '0.8rem', fontFamily: 'monospace', cursor: 'pointer',
  } as React.CSSProperties,
  btnDisabled: {
    background: 'transparent', color: '#444', border: '1px solid #2a2a2a',
    padding: '6px 16px', borderRadius: 5,
    fontSize: '0.8rem', fontFamily: 'monospace', cursor: 'not-allowed',
  } as React.CSSProperties,
}
