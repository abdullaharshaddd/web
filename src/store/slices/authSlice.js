import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const USERS_KEY = 'ems_users'
const SESSION_KEY = 'ems_session'

const initialState = {
  currentUser: loadFromStorage(SESSION_KEY, null),
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      const { name, email, password } = action.payload
      const users = loadFromStorage(USERS_KEY, [])

      const alreadyExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      )

      if (alreadyExists) {
        state.error = 'An account with this email already exists'
        return
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      }

      users.push(newUser)
      saveToStorage(USERS_KEY, users)

      const session = { id: newUser.id, name: newUser.name, email: newUser.email }
      saveToStorage(SESSION_KEY, session)

      state.currentUser = session
      state.error = null
    },

    loginUser(state, action) {
      const { email, password } = action.payload
      const users = loadFromStorage(USERS_KEY, [])

      const matchedUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      )

      if (!matchedUser) {
        state.error = 'Invalid email or password'
        return
      }

      const session = { id: matchedUser.id, name: matchedUser.name, email: matchedUser.email }
      saveToStorage(SESSION_KEY, session)

      state.currentUser = session
      state.error = null
    },

    logoutUser(state) {
      state.currentUser = null
      localStorage.removeItem(SESSION_KEY)
    },

    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { registerUser, loginUser, logoutUser, clearAuthError } = authSlice.actions
export default authSlice.reducer
