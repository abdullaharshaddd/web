import { useEffect, useState } from 'react'
import { searchEvents } from '../services/ticketmaster'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import Pagination from '../components/Pagination'

function Upcoming() {
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    searchEvents({
      sort: 'date,asc',
      startDateTime: new Date().toISOString().slice(0, 19) + 'Z',
      size: 20,
      page,
    })
      .then((data) => {
        if (cancelled) return
        setEvents(data._embedded ? data._embedded.events : [])
        setTotalPages(data.page ? Math.min(data.page.totalPages, 50) : 0)
        setStatus('succeeded')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setStatus('failed')
      })

    return () => {
      cancelled = true
    }
  }, [page])

  return (
    <div className="page">
      <h1>Upcoming events</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 20 }}>
        Sorted by what's happening soonest.
      </p>

      {status === 'loading' && <Loader text="Loading upcoming events..." />}
      {status === 'failed' && <ErrorMessage message={error} />}

      {status === 'succeeded' && events.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '40px 0' }}>
          No upcoming events found.
        </p>
      )}

      {status === 'succeeded' && events.length > 0 && (
        <>
          <div className="grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}

export default Upcoming
