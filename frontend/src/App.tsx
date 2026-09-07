import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AirlineLayout from './components/AirlineLayout'
import A1_Home from './features/home/A1_Home'
import B1_SearchResults from './features/flight/pages/B1_SearchResults'
import B2_FlightDetail from './features/flight/pages/B2_FlightDetail'
import C1_PassengerInfo from './features/reservation/pages/C1_PassengerInfo'
import C2_SeatSelection from './features/reservation/pages/C2_SeatSelection'
import C3_Payment from './features/reservation/pages/C3_Payment'
import C4_Confirmation from './features/reservation/pages/C4_Confirmation'
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
