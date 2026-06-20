import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleHomeClick() {
    setMenuOpen(false)
    scrollToTop()
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={scrollToTop}>
          <span className="logo-icon">T</span>
          <span className="logo-text">TrackWise</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <Link to="/login" className="nav-btn" onClick={() => setMenuOpen(false)}>Register / Login</Link>
        </nav>
      </div>
    </header>
  )
}
