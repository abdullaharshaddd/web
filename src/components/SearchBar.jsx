import { useEffect, useState } from 'react'
import './SearchBar.css'

function SearchBar({ value, onSearch }) {
  const [text, setText] = useState(value || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text !== value) {
        onSearch(text)
      }
    }, 450)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search events, artists, teams..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  )
}

export default SearchBar
