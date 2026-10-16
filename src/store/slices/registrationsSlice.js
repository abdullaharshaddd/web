import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const REGISTRATIONS_KEY = 'ems_registrations'

const initialState = {
  items: loadFromStorage(REGISTRATIONS_KEY, []),
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent(state, action) {
      const { userId, event } = action.payload

      const alreadyRegistered = state.items.some(
        (reg) => reg.userId === userId && reg.eventId === event.id
      )

      if (alreadyRegistered) {
        return
      }

      const venue = event._embedded?.venues?.[0]
      const image = event.images?.find((img) => img.width >= 400)?.url || event.images?.[0]?.url

      state.items.push({
        id: crypto.randomUUID(),
        userId,
        eventId: event.id,
        registeredAt: new Date().toISOString(),
        snapshot: {
          id: event.id,
          name: event.name,
          date: event.dates?.start?.localDate,
          time: event.dates?.start?.localTime,
          venue: venue ? venue.name : '',
          image: image || '',
        },
      })

      saveToStorage(REGISTRATIONS_KEY, state.items)
    },

    cancelRegistration(state, action) {
      const { registrationId } = action.payload
      state.items = state.items.filter((reg) => reg.id !== registrationId)
      saveToStorage(REGISTRATIONS_KEY, state.items)
    },
  },
})

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions
export default registrationsSlice.reducer
