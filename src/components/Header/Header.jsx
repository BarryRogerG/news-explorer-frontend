import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import Navigation from '../Navigation/Navigation'

function Header({ onSignInClick, onSignOut, isLoggedIn, currentUser }) {
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleSignInClick = () => {
    handleMenuClose()
    onSignInClick()
  }

  const handleSignOut = () => {
    handleMenuClose()
    onSignOut()
  }
  
  return (
    <header className={`header ${isMainPage ? 'header_overlay' : ''} ${isMenuOpen ? 'header_menu-open' : ''}`}>
      <Link to="/" className="header__logo" onClick={handleMenuClose}>
        NewsExplorer
      </Link>
      <button
        type="button"
        className={`header__menu-button ${isMenuOpen ? 'header__menu-button_close' : ''}`}
        onClick={handleMenuToggle}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="header__menu-icon"></span>
        <span className="header__menu-icon"></span>
        <span className="header__menu-icon"></span>
      </button>
      <div 
        className={`header__menu-overlay ${isMenuOpen ? 'header__menu-overlay_open' : ''}`} 
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleMenuClose()
          }
        }}
      >
        <Navigation 
          onSignInClick={handleSignInClick}
          onSignOut={handleSignOut}
          isOverlay={isMainPage}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          isMobile={true}
          onLinkClick={handleMenuClose}
        />
      </div>
      <Navigation 
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        isOverlay={isMainPage}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        isMobile={false}
      />
    </header>
  )
}

export default Header

