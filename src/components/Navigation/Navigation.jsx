import { NavLink } from 'react-router-dom'

import './Navigation.css'

function LogoutIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17L21 12L16 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
          className="navigation__button navigation__button_logout"
          onClick={onSignOut}
          aria-label="Sign out"
        >
          <span className="navigation__button-text">{currentUser?.name || 'Sign out'}</span>
          <LogoutIcon />
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

