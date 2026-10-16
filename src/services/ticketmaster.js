const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY

async function callApi(path, params = {}) {
  if (!API_KEY) {
    throw new Error('Ticketmaster API key is missing. Add it to your .env file.')
  }

  const url = new URL(BASE_URL + path)
  url.searchParams.set('apikey', API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Could not load data from Ticketmaster right now')
  }

  return response.json()
}

export function searchEvents(params) {
  return callApi('/events.json', params)
}

export function getEventById(id) {
  return callApi(`/events/${id}.json`)
}

export function getClassifications() {
  return callApi('/classifications.json', { size: 40 })
}
