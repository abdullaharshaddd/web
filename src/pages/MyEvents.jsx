import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cancelRegistration } from '../store/slices/registrationsSlice'
import { formatEventDate, isEventInPast } from '../utils/date'
import Toast from '../components/Toast'
import './MyEvents.css'

function MyEvents() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const allRegistrations = useSelector((state) => state.registrations.items)
  const [toast, setToast] = useState(null)

  const myRegistrations = allRegistrations.filter((reg) => reg.userId === currentUser.id)

  const upcoming = myRegistrations.filter((reg) => !isEventInPast(reg.snapshot.date))
  const completed = myRegistrations.filter((reg) => isEventInPast(reg.snapshot.date))

  function handleCancel(registrationId) {
    dispatch(cancelRegistration({ registrationId }))
    setToast('Registration cancelled')
  }

  function renderRegistration(reg, showCancel) {
    return (
      <div key={reg.id} className="my-event-card card">
        {reg.snapshot.image && <img src={reg.snapshot.image} alt={reg.snapshot.name} />}

        <div className="my-event-body">
          <Link to={`/events/${reg.eventId}`}>
            <h3>{reg.snapshot.name}</h3>
          </Link>
          <p>{formatEventDate(reg.snapshot.date, reg.snapshot.time)}</p>
          {reg.snapshot.venue && <p className="my-event-venue">{reg.snapshot.venue}</p>}

          {showCancel && (
            <button className="btn btn-danger" onClick={() => handleCancel(reg.id)}>
              Cancel registration
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>My Events</h1>

      <h2>Upcoming</h2>
      {upcoming.length === 0 ? (
        <p className="my-events-empty">You have no upcoming registrations yet.</p>
      ) : (
        <div className="my-events-list">
          {upcoming.map((reg) => renderRegistration(reg, true))}
        </div>
      )}

      <h2>Completed</h2>
      {completed.length === 0 ? (
        <p className="my-events-empty">No past events yet.</p>
      ) : (
        <div className="my-events-list">
          {completed.map((reg) => renderRegistration(reg, false))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}

export default MyEvents
