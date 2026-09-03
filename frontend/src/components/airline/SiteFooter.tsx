import { COLORS } from '../../styles/colors'

export default function SiteFooter() {
  return (
    <footer style={{
      background: COLORS.navy,
      color: '#cbd5e1',
      marginTop: 60,
      padding: '32px 32px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 48 }}>
        {[
          { title: '예약/발권', items: ['국내선 예약', '국제선 예약', '예약 확인·취소'] },
          { title: '마일리지', items: ['스카이패스 안내', '마일리지 조회', '제휴사'] },
          { title: '고객지원', items: ['공지사항', '자주 묻는 질문', '1:1 문의'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              {col.title}
            </div>
            {col.items.map(it => (
              <div key={it} style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 6 }}>{it}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1100, margin: '24px auto 0', paddingTop: 16,
        borderTop: '1px solid #24365c', fontSize: '0.7rem', color: '#64748b',
      }}>
        © loveMyself Air · 목업 화면입니다. 실제 예약/결제가 발생하지 않습니다.
      </div>
    </footer>
  )
}
