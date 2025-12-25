import { useCallback } from 'react'

import PropTypes from 'prop-types'

import './NewsCard.css'

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

function BookmarkIcon({ filled }) {
  return (
    <svg
      className={`bookmark-icon ${filled ? 'bookmark-icon_filled' : ''}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="bookmark-icon__path"
        d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

BookmarkIcon.propTypes = {
  filled: PropTypes.bool,
}

function NewsCard({
  card,
  isLoggedIn = false,
  isSaved = false,
  onSaveClick,
  onDeleteClick,
  onCardClick,
}) {
  const {
    title = 'No title available',
    description,
    content,
    url,
    urlToImage,
    publishedAt,
    keyword = 'Nature',
    source,
  } = card || {}

  const sourceName = source?.name || source || 'Unknown Source'

  const handleBookmarkClick = useCallback(
    (e) => {
      e.stopPropagation()
      if (isSaved) {
        onDeleteClick?.(card)
      } else {
        onSaveClick?.(card)
      }
    },
    [isSaved, onDeleteClick, onSaveClick, card]
  )

  const handleCardClick = useCallback(() => {
    if (onCardClick && url) {
      onCardClick(url)
    }
  }, [onCardClick, url])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleCardClick()
      }
    },
    [handleCardClick]
  )

  return (
    <article
      className={`news-card ${onCardClick ? 'news-card_clickable' : ''}`}
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="news-card__image-container">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="news-card__image"
            loading="lazy"
          />
        ) : (
          <div className="news-card__image-placeholder">No Image</div>
        )}

        <div className="news-card__bookmark-container">
          {isLoggedIn ? (
            <button
              type="button"
              className={`news-card__bookmark ${
                isSaved ? 'news-card__bookmark_saved' : ''
              }`}
              onClick={handleBookmarkClick}
              aria-label={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <BookmarkIcon filled={isSaved} />
            </button>
          ) : (
            <div className="news-card__bookmark-tooltip-wrapper">
              <button
                type="button"
                className="news-card__bookmark news-card__bookmark_inactive"
                aria-label="Sign in to save articles"
                disabled
              >
                <BookmarkIcon />
              </button>
              <div className="news-card__tooltip">
                Sign in to save articles
              </div>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <div className="news-card__keyword">{keyword}</div>
        )}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">
          {description || content || 'No description available'}
        </p>
        <p className="news-card__source">{sourceName}</p>
      </div>
    </article>
  )
}

NewsCard.propTypes = {
  card: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  isSaved: PropTypes.bool,
  onSaveClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onCardClick: PropTypes.func,
}

export default NewsCard
