import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, setFilters, resetFilters } from '../store/slices/eventsSlice'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import Pagination from '../components/Pagination'
import './EventsList.css'

function EventsList() {
  const dispatch = useDispatch()
  const { items, status, error, page, totalPages, filters } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEvents({ filters, page: 0 }))
  }, [])

  function handleSearch(keyword) {
    const newFilters = { ...filters, keyword }
    dispatch(setFilters({ keyword }))
    dispatch(fetchEvents({ filters: newFilters, page: 0 }))
  }

  function handleFilterChange(change) {
    const newFilters = { ...filters, ...change }
    dispatch(setFilters(change))
    dispatch(fetchEvents({ filters: newFilters, page: 0 }))
  }

  function handleReset() {
    dispatch(resetFilters())
    dispatch(
      fetchEvents({
        filters: { keyword: '', segmentId: '', city: '', countryCode: '', startDate: '', endDate: '' },
        page: 0,
      })
    )
  }

  function handlePageChange(newPage) {
    dispatch(fetchEvents({ filters, page: newPage }))
  }

  return (
    <div className="page">
      <h1>Events</h1>

      <div className="events-toolbar">
        <SearchBar value={filters.keyword} onSearch={handleSearch} />
      </div>

      <FilterPanel filters={filters} onChange={handleFilterChange} onReset={handleReset} />

      {status === 'loading' && <Loader text="Loading events..." />}

      {status === 'failed' && (
        <ErrorMessage message={error} onRetry={() => dispatch(fetchEvents({ filters, page }))} />
      )}

      {status === 'succeeded' && items.length === 0 && (
        <p className="events-empty">No events found. Try different filters.</p>
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <div className="grid">
            {items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default EventsList
