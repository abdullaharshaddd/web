import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/slices/eventsSlice'
import './FilterPanel.css'

function FilterPanel({ filters, onChange, onReset }) {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.events.categories)
  const categoriesStatus = useSelector((state) => state.events.categoriesStatus)

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [categoriesStatus, dispatch])

  const segments = categories
    .map((c) => c.segment)
    .filter((s) => s && s.name && s.name !== 'Undefined')
    .filter((s, index, arr) => arr.findIndex((other) => other.id === s.id) === index)

  return (
    <div className="filter-panel card">
      <div className="filter-field">
        <label>Category</label>
        <select
          value={filters.segmentId}
          onChange={(e) => onChange({ segmentId: e.target.value })}
        >
          <option value="">All categories</option>
          {segments.map((segment) => (
            <option key={segment.id} value={segment.id}>{segment.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label>City</label>
        <input
          type="text"
          placeholder="e.g. New York"
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
      </div>

      <div className="filter-field">
        <label>Country code</label>
        <input
          type="text"
          placeholder="e.g. US"
          value={filters.countryCode}
          onChange={(e) => onChange({ countryCode: e.target.value })}
        />
      </div>

      <div className="filter-field">
        <label>From</label>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
      </div>

      <div className="filter-field">
        <label>To</label>
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />
      </div>

      <button className="btn btn-outline filter-reset" onClick={onReset}>
        Clear filters
      </button>
    </div>
  )
}

export default FilterPanel
