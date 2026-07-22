import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrency, CURRENCIES } from '../context/CurrencyContext.jsx'
import './DashboardHeader.css'

export default function DashboardHeader({ title }) {
  const navigate = useNavigate()
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const [user] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <header className="dash-header">
      <h1 className="dash-title">{title}</h1>

      <div className="dash-header-right" ref={dropdownRef}>
        <div className="currency-select-wrap">
          <select
            className="currency-select"
            value={currency.code}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Select currency"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
        </div>

        <button className="user-btn" onClick={() => setOpen(!open)}>
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.name ?? 'User'}</span>
            <span className="user-email">{user?.email ?? ''}</span>
          </div>
          <span className="chevron">{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="user-dropdown">
            <div className="dropdown-header">
              <div className="user-avatar sm">{initials}</div>
              <div>
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
            </div>
            <div className="dropdown-divider" />
            <button className="dropdown-item logout" onClick={handleLogout}>
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
