import { useState, useMemo, useCallback } from 'react'

import './Main.css'

import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import NewsCard from '../NewsCard/NewsCard'
import { searchNews } from '../../utils/newsApi'

const INITIAL_DISPLAY_COUNT = 3

function Main({
  isLoggedIn = false,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(null)
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  const normalizeSearchTerm = (term) => term.trim()

  const handleSearch = async (searchTerm) => {
    const normalizedTerm = normalizeSearchTerm(searchTerm)

    if (!normalizedTerm) {
      setError('Please enter a keyword')
      return
    }

    setIsLoading(true)
    setHasSearched(true)
    setError(null)
    setDisplayCount(INITIAL_DISPLAY_COUNT)

    try {
      const articles = await searchNews(normalizedTerm)

      const articlesWithKeyword = (articles || []).map((article) => ({
        ...article,
        keyword: normalizedTerm,
      }))

      setArticles(articlesWithKeyword)
    } catch (err) {
      setError(
        err.message ||
          'Sorry, something went wrong during the request. Please try again later.'
      )
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowMore = useCallback(() => {
    setDisplayCount((prev) => prev + INITIAL_DISPLAY_COUNT)
  }, [])

  const handleCardClick = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const isArticleSaved = useCallback(
    (article) =>
      isLoggedIn &&
      savedArticles.some((saved) => saved.url === article.url),
    [isLoggedIn, savedArticles]
  )

  const displayedArticles = useMemo(
    () => articles.slice(0, displayCount),
    [articles, displayCount]
  )

  const hasMoreArticles = useMemo(
    () => articles.length > displayCount,
    [articles.length, displayCount]
  )

  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>

      <section className="main__results">
        {isLoading && <Preloader />}

        {!isLoading && error && (
          <div className="main__error">
            <p className="main__error-text">{error}</p>
          </div>
        )}

        {!isLoading && hasSearched && articles.length === 0 && !error && (
          <div className="main__no-results">
            <p className="main__no-results-text">Nothing found</p>
          </div>
        )}

        {!isLoading && displayedArticles.length > 0 && (
          <>
            <div className="main__cards-grid">
              {displayedArticles.map((article) => (
                <NewsCard
                  key={article.url}
                  card={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={isArticleSaved(article)}
                  onSaveClick={onSaveArticle}
                  onDeleteClick={onDeleteArticle}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>

            {hasMoreArticles && (
              <div className="main__show-more">
                <button
                  className="main__show-more-button"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Main
