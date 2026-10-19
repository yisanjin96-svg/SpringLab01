import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './features/home/pages/Home'
import FlightList from './features/flight/pages/FlightList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* X1 航空便検索（ホーム） */}
        <Route path="/" element={<Home />} />
        {/* X2 航空便一覧 */}
        <Route path="/flights" element={<FlightList />} />
      </Routes>
    </BrowserRouter>
  )
}
