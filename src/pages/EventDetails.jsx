import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventById, clearCurrentEvent } from '../store/slices/eventsSlice'
import { formatEventDate } from '../utils/date'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import './EventDetails.css'

function EventDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const event = useSelector((state) => state.events.currentEvent)
  const status = useSelector((state) => state.events.currentEventStatus)
  const error = useSelector((state) => state.events.currentEventError)

  useEffect(() => {
    dispatch(fetchEventById(id))
    return () => dispatch(clearCurrentEvent())
  }, [id, dispatch])

  if (status === 'loading' || status === 'idle') {
    return <Loader text="Loading event..." />
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} onRetry={() => dispatch(fetchEventById(id))} />
  }

  if (!event) {
    return null
  }

  const venue = event._embedded?.venues?.[0]
  const classification = event.classifications?.[0]
  const image = event.images?.find((img) => img.width >= 600)?.url || event.images?.[0]?.url
  const priceRange = event.priceRanges?.[0]

  return (
    <div className="page event-details">
      <div className="event-details-image">
        {image ? <img src={image} alt={event.name} /> : <div className="event-card-no-image">No image</div>}
      </div>

      <div className="event-details-body">
        <h1>{event.name}</h1>

        {classification && (
          <p className="event-details-category">
            {[classification.segment?.name, classification.genre?.name]
              .filter((name) => name && name !== 'Undefined')
              .join(' · ')}
          </p>
        )}

        <div className="event-details-info">
          <div>
            <strong>Date and time</strong>
            <p>{formatEventDate(event.dates?.start?.localDate, event.dates?.start?.localTime)}</p>
          </div>

          {venue && (
            <div>
              <strong>Venue</strong>
              <p>
                {venue.name}
                {venue.city ? `, ${venue.city.name}` : ''}
                {venue.country ? `, ${venue.country.name}` : ''}
              </p>
            </div>
          )}

          {priceRange && (
            <div>
              <strong>Price range</strong>
              <p>
                {priceRange.min} - {priceRange.max} {priceRange.currency}
              </p>
            </div>
          )}
        </div>

        <div className="event-details-actions">
          {event.url && (
            <a href={event.url} target="_blank" rel="noreferrer" className="btn">
              Buy tickets on Ticketmaster
            </a>
          )}
        </div>

        {event.seatmap?.staticUrl && (
          <div className="event-details-seatmap">
            <strong>Seat map</strong>
            <img src={event.seatmap.staticUrl} alt="Seat map" />
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails
