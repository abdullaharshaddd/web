import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, setFilters } from '../store/slices/eventsSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import './Categories.css'

function Categories() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector((state) => state.events.categories)
  const categoriesStatus = useSelector((state) => state.events.categoriesStatus)
  const categoriesError = useSelector((state) => state.events.categoriesError)

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [categoriesStatus, dispatch])

  const segments = categories
    .map((c) => c.segment)
    .filter((s) => s && s.name && s.name !== 'Undefined')
    .filter((s, index, arr) => arr.findIndex((other) => other.id === s.id) === index)

  function handleSelect(segmentId) {
    dispatch(setFilters({ segmentId }))
    navigate('/events')
  }

  return (
    <div className="page">
      <h1>Browse by category</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 20 }}>
        Pick a category to see what's happening.
      </p>

      {categoriesStatus === 'loading' && <Loader text="Loading categories..." />}
      {categoriesStatus === 'failed' && <ErrorMessage message={categoriesError} />}

      {categoriesStatus === 'succeeded' && (
        <div className="category-grid">
          {segments.map((segment) => (
            <button
              key={segment.id}
              className="category-card card"
              onClick={() => handleSelect(segment.id)}
            >
              {segment.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
