import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearAuthError } from '../store/slices/authSlice'
import { isValidEmail } from '../utils/validation'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authError = useSelector((state) => state.auth.error)
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(clearAuthError())

    const errors = {}

    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!password) {
      errors.password = 'Please enter your password'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="page auth-page card">
      <h1>Welcome back</h1>
      <p className="sub">Login to manage your event registrations.</p>

      {authError && <div className="auth-error">{authError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && <span className="auth-field-error">{formErrors.email}</span>}
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && <span className="auth-field-error">{formErrors.password}</span>}
        </div>

        <button type="submit" className="btn">Login</button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default Login
