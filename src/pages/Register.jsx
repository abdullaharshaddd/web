import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearAuthError } from '../store/slices/authSlice'
import { isValidEmail, isValidPassword } from '../utils/validation'
import './Auth.css'

function Register() {
  const [name, setName] = useState('')
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

    if (!name.trim()) {
      errors.name = 'Please enter your name'
    }

    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!isValidPassword(password)) {
      errors.password = 'Password must be at least 6 characters'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    dispatch(registerUser({ name, email, password }))
  }

  return (
    <div className="page auth-page card">
      <h1>Create an account</h1>
      <p className="sub">Register to save and track events you care about.</p>

      {authError && <div className="auth-error">{authError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && <span className="auth-field-error">{formErrors.name}</span>}
        </div>

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

        <button type="submit" className="btn">Register</button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  )
}

export default Register
