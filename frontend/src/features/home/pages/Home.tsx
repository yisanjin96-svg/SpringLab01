import '../home.css'
import X1_FlightSearchBar from '../components/X1_FlightSearchBar'


export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-logo">HOSHIMOTO AIR</h1>
      </header>

      <main className="home-main">
        <h2 className="home-headline">どちらへお出かけですか？</h2>
        <X1_FlightSearchBar />
      </main>
    </div>
  )
}
