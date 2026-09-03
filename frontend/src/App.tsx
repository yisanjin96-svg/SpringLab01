import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AirlineLayout from './components/airline/AirlineLayout'
import A1_Home from './pages/A1_Home'
import B1_SearchResults from './pages/B1_SearchResults'
import B2_FlightDetail from './pages/B2_FlightDetail'
import C1_PassengerInfo from './pages/C1_PassengerInfo'
import C2_SeatSelection from './pages/C2_SeatSelection'
import C3_Payment from './pages/C3_Payment'
import C4_Confirmation from './pages/C4_Confirmation'
import LockDemoPage from './pages/legacy/LockDemoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AirlineLayout />}>
          <Route path="/" element={<A1_Home />} />
          <Route path="/search" element={<B1_SearchResults />} />
          <Route path="/flights/:id" element={<B2_FlightDetail />} />
          <Route path="/booking/passengers" element={<C1_PassengerInfo />} />
          <Route path="/booking/seats" element={<C2_SeatSelection />} />
          <Route path="/booking/payment" element={<C3_Payment />} />
          <Route path="/booking/complete" element={<C4_Confirmation />} />
        </Route>
        <Route path="/demo/lock" element={<LockDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
