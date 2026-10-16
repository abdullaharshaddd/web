import { Link } from 'react-router-dom'
import { formatEventDate } from '../utils/date'
import './EventCard.css'

function getBestImage(images) {
  if (!images || images.length === 0) return null
  const wide = images.find((img) => img.width >= 400)
  return wide ? wide.url : images[0].url
}

function EventCard({ event }) {
  const image = getBestImage(event.images)
  const venue = event._embedded?.venues?.[0]
  const segment = event.classifications?.[0]?.segment?.name

  return (
    <Link to={`/events/${event.id}`} className="event-card card">
      <div className="event-card-image">
        {image ? <img src={image} alt={event.name} /> : <div className="event-card-no-image">No image</div>}
      </div>

      <div className="event-card-body">
        {segment && <span className="event-card-tag">{segment}</span>}
        <h3>{event.name}</h3>
        <p className="event-card-date">{formatEventDate(event.dates?.start?.localDate, event.dates?.start?.localTime)}</p>
        {venue && <p className="event-card-venue">{venue.name}{venue.city ? `, ${venue.city.name}` : ''}</p>}
      </div>
    </Link>
  )
}

export default EventCard
