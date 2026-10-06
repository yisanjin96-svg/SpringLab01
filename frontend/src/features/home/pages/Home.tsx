import '../home.css'
import FlightSearchBar from '../components/FlightSearchBar'


export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-logo">HOSHIMOTO AIR</h1>
      </header>

      <main className="home-main">
        <h2 className="home-headline">어디에 방문하실 예정이신가요?</h2>
        <FlightSearchBar />
      </main>
    </div>
  )
}
