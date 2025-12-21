import { NavLink } from 'react-router-dom'

import './Navigation.css'

function Navigation({
  onSignInClick,
  onSignOut,
  isOverlay = false,
  isLoggedIn = false,
  currentUser,
  isMobile = false,
  onLinkClick,
}) {
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <nav className={`navigation ${isOverlay ? 'navigation_overlay' : ''} ${isMobile ? 'navigation_mobile' : 'navigation_desktop'}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navigation__link ${isActive ? 'navigation__link_active' : ''}`
        }
        onClick={handleLinkClick}
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) =>
            `navigation__link ${isActive ? 'navigation__link_active' : ''}`
          }
          onClick={handleLinkClick}
        >
          Saved articles
        </NavLink>
      )}

      {isLoggedIn ? (
        <button
          type="button"
          className="navigation__button"
          onClick={onSignOut}
          aria-label="Sign out"
        >
          {currentUser?.name || 'Sign out'}
        </button>
      ) : (
        <button
          type="button"
          className="navigation__button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  )
}

export default Navigation

