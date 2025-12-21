import { useState, useMemo } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [touched, setTouched] = useState(false)

  const error = useMemo(() => {
    if (!touched) return ''
    if (searchTerm.trim() === '') return 'Please enter a keyword'
    if (searchTerm.trim().length < 2) return 'Keyword must be at least 2 characters'
    return ''
  }, [searchTerm, touched])

  const isValid = useMemo(() => {
    return searchTerm.trim().length >= 2
  }, [searchTerm])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    
    if (isValid && onSearch) {
      onSearch(searchTerm.trim())
    }
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`search-form__input ${error ? 'search-form__input_error' : ''}`}
          placeholder="Enter topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleBlur}
          minLength="2"
          required
        />
        <button 
          type="submit" 
          className="search-form__button"
          disabled={!isValid}
        >
          Search
        </button>
      </form>
      {error && (
        <span className="search-form__error">{error}</span>
      )}
    </div>
  )
}

export default SearchForm

