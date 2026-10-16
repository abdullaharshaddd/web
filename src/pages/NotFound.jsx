import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 60 }}>
      <h1>404</h1>
      <p>We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn">Go back home</Link>
    </div>
  )
}

export default NotFound
