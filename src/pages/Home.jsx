import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 40 }}>
      <h1>Find events worth going to</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 24 }}>
        Search concerts, sports and shows near you, powered by Ticketmaster.
      </p>
      <Link to="/events" className="btn">Browse events</Link>
    </div>
  )
}

export default Home
