import { Outlet } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { COLORS } from '../styles/colors'

export default function AirlineLayout() {
  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}
