import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} Supersite, Powered by News API
      </p>
      <nav className="footer__nav">
        <Link to="/" className="footer__link">Home</Link>
        <a href="https://tripleten.com" className="footer__link" target="_blank" rel="noopener noreferrer">
          TripleTen
        </a>
      </nav>
      <div className="footer__about">
        <h3 className="footer__about-title">About</h3>
        <p className="footer__about-text">
          This is a news exploration application that allows users to search for articles 
          from around the world. Users can save their favorite articles and access them 
          anytime from their personal account.
        </p>
      </div>
    </footer>
  )
}

export default Footer


