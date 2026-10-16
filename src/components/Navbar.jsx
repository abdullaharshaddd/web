import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/slices/authSlice'
import './Navbar.css'

function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">EventHub</Link>

        <div className="navbar-links">
          <Link to="/events">Events</Link>
          <Link to="/upcoming">Upcoming</Link>
          <Link to="/categories">Categories</Link>

          {currentUser && <Link to="/my-events">My Events</Link>}

          {currentUser ? (
            <>
              <span className="navbar-user">Hi, {currentUser.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
