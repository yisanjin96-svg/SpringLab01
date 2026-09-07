import SearchWidget from './SearchWidget'
import { COLORS } from '../../styles/colors'

const PROMOS = [
  { title: '도쿄 특가', desc: '왕복 289,000원부터', tag: 'JAPAN' },
  { title: '가을맞이 국내선 할인', desc: '제주 · 부산 최대 30%', tag: 'DOMESTIC' },
  { title: '스카이패스 신규 가입', desc: '가입 즉시 1,000마일 적립', tag: 'MILEAGE' },
]

export default function A1_Home() {
  return (
    <div>
      <section style={{
        background: `linear-gradient(160deg, ${COLORS.navy}, ${COLORS.navyLight})`,
        padding: '64px 24px 120px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative',
      }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>
          당신을 위한 여정, loveMyself Air
        </h1>
        <p style={{ color: '#c7d2e0', fontSize: '0.9rem', marginBottom: 32 }}>
          국내선부터 장거리 노선까지 한 번에 조회하고 예약하세요
        </p>
        <SearchWidget />
      </section>

      <section style={{ maxWidth: 1100, margin: '-70px auto 0', padding: '0 24px 60px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PROMOS.map(p => (
            <div key={p.title} style={{
              background: COLORS.panel, borderRadius: 10, border: `1px solid ${COLORS.border}`,
              padding: 20, boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: COLORS.amber,
                border: `1px solid ${COLORS.amber}`, borderRadius: 4, padding: '2px 7px',
              }}>
                {p.tag}
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.text, marginTop: 10 }}>{p.title}</div>
              <div style={{ fontSize: '0.8rem', color: COLORS.textSub, marginTop: 4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
