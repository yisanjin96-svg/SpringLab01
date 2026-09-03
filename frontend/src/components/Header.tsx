interface HeaderProps {
  serverStatus: string
}

export default function Header({ serverStatus }: HeaderProps) {
  return (
    <header style={{
      background: '#0a0a0a',
      borderBottom: '1px solid #222',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{
        width: 28, height: 28,
        background: 'linear-gradient(135deg,#d97706,#f59e0b)',
        borderRadius: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 700, color: '#000',
      }}>
        ✈
      </div>

      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e5e5e5' }}>
        loveMyself Air
      </span>

      <span style={{ color: '#333' }}>/</span>

      <span style={{ fontSize: '0.85rem', color: '#888' }}>항공권 예약</span>

      <span style={{ fontSize: '0.75rem', color: '#22c55e', fontFamily: 'monospace' }}>
        {serverStatus}
      </span>

      <span style={{
        marginLeft: 'auto',
        background: '#1a1a00', border: '1px solid #d97706',
        color: '#d97706', fontSize: '0.68rem', padding: '2px 8px',
        borderRadius: 4, fontWeight: 600, letterSpacing: '0.5px',
      }}>
        낙관적 락 학습용
      </span>
    </header>
  )
}
