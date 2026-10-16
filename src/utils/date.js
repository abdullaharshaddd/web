export function toApiStartOfDay(dateString) {
  return `${dateString}T00:00:00Z`
}

export function toApiEndOfDay(dateString) {
  return `${dateString}T23:59:59Z`
}

export function formatEventDate(dateString, timeString) {
  if (!dateString) return 'Date to be announced'

  const date = new Date(timeString ? `${dateString}T${timeString}` : dateString)

  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (!timeString) return formatted

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return `${formatted} · ${time}`
}

export function isEventInPast(dateString) {
  if (!dateString) return false
  return new Date(dateString) < new Date()
}
