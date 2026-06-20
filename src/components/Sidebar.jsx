import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',     icon: '📊' },
  { to: '/transactions',  label: 'Transactions',  icon: '💸' },
  { to: '/budgets',       label: 'Budgets',       icon: '🎯' },
  { to: '/goals',         label: 'Goals',         icon: '💰' },
  { to: '/household',     label: 'Household',     icon: '🏠' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">T</span>
        <span className="logo-text">TrackWise</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>TrackWise v1.0</p>
      </div>
    </aside>
  )
}
