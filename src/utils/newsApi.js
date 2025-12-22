// newsApi.js

// Constants
const NEWS_API_BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

const DAYS_BACK = 7

const PAGE_SIZE = 100

// API key (Vite environment variable)
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => date.toISOString().split('T')[0]

/**
 * Get date string N days ago
 * @param {number} days
 * @returns {string}
 */
const getDateDaysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return formatDate(date)
}

/**
 * Handle API and network errors
 * @param {Response} response
 */
const handleResponseError = async (response) => {
  if (response.status === 401) {
    throw new Error('Invalid API key')
  }

  if (response.status === 429) {
    throw new Error('Too many requests. Please try again later.')
  }

  const errorData = await response.json().catch(() => null)
  throw new Error(
    errorData?.message || `Request failed with status ${response.status}`
  )
}

/**
 * Search for news articles
 * @param {string} keyword
 * @returns {Promise<Array>} List of articles
 */
export const searchNews = async (keyword) => {
  if (!keyword?.trim()) {
    throw new Error('Please enter a keyword')
  }

  if (!NEWS_API_KEY || NEWS_API_KEY.trim() === '') {
    throw new Error(
      'API key is missing. Please create a .env file in the root directory with VITE_NEWS_API_KEY=your_api_key_here. Get a free API key from https://newsapi.org/register'
    )
  }

  const params = new URLSearchParams({
    q: keyword.trim(),
    from: getDateDaysAgo(DAYS_BACK),
    to: formatDate(new Date()),
    pageSize: PAGE_SIZE,
    apiKey: NEWS_API_KEY,
  })

  try {
    const response = await fetch(`${NEWS_API_BASE_URL}?${params}`)

    if (!response.ok) {
      await handleResponseError(response)
    }

    const data = await response.json()

    if (data.status === 'error') {
      throw new Error(data.message || 'News API error')
    }

    return data.articles
  } catch (error) {
    if (
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError')
    ) {
      throw new Error(
        'Network error. Please check your connection and try again.'
      )
    }

    throw error
  }
}
