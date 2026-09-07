import { Link } from 'react-router-dom'
import { COLORS } from '../styles/colors'

export default function SiteHeader() {
  return (
    <header style={{
      background: COLORS.panel,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 30, height: 30,
          background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.amberLight})`,
          borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: '#000',
        }}>
          ✈
        </div>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.navy, letterSpacing: '-0.3px' }}>
          loveMyself Air
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: 28, marginLeft: 48 }}>
        {['항공권 예약', '예약 확인/취소', '마일리지', '스카이패스'].map(item => (
          <span key={item} style={{ fontSize: '0.88rem', color: COLORS.text, cursor: 'pointer', fontWeight: 500 }}>
            {item}
          </span>
        ))}
      </nav>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 18, alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: COLORS.textSub, cursor: 'pointer' }}>KOR</span>
        <span style={{ fontSize: '0.82rem', color: COLORS.textSub, cursor: 'pointer' }}>로그인</span>
        <span style={{
          fontSize: '0.68rem', color: COLORS.amber, border: `1px solid ${COLORS.amber}`,
          padding: '3px 8px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.3px',
        }}>
          MOCKUP
        </span>
      </div>
    </header>
  )
}
