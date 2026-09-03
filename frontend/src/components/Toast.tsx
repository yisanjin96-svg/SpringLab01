interface ToastProps {
  message: string
  ok: boolean
}

export default function Toast({ message, ok }: ToastProps) {
  return (
    <div style={{
      background: '#111', border: '1px solid #222',
      borderLeft: `3px solid ${ok ? '#22c55e' : '#ef4444'}`,
      borderRadius: 5, padding: '10px 16px', marginBottom: 20,
      fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ color: ok ? '#86efac' : '#fca5a5' }}>
        {ok ? '✓' : '✗'}
      </span>
      {message}
    </div>
  )
}
