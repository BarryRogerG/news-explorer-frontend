import { NavLink } from 'react-router-dom'

import './Navigation.css'

function Navigation({
  onSignInClick,
  onSignOut,
  isOverlay = false,
  isLoggedIn = false,
  currentUser,
  isMobile = false,
  isMenuOpen = false,
  onLinkClick,
  onCloseMenu,
}) {
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <nav className={`navigation ${isOverlay ? 'navigation_overlay' : ''} ${isMobile ? 'navigation_mobile' : 'navigation_desktop'} ${isMobile && isMenuOpen ? 'navigation_mobile_open' : ''}`}>
      {isMobile && (
        <div className="navigation_mobile__header">
          <span className="navigation_mobile__logo">NewsExplorer</span>
          <button
            type="button"
            className="navigation_mobile__close"
            onClick={onCloseMenu}
            aria-label="Close menu"
          >
            <span className="navigation_mobile__close-icon"></span>
            <span className="navigation_mobile__close-icon"></span>
          </button>
        </div>
      )}
      <div className={isMobile ? 'navigation_mobile__content' : 'navigation__content'}>
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
      </div>
    </nav>
  )
}

export default Navigation

