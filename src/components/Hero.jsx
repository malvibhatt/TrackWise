import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-badge">Personal & Household Finance</span>
        <h1>Take control of your<br /><span className="hero-highlight">financial future</span></h1>
        <p>
          TrackWise helps you and your household track every rupee — log expenses,
          set budgets, hit savings goals, and finally understand where your money goes.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn-primary">Get Started Free</Link>
          <a href="#about" className="btn-ghost">See How It Works</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>Track</strong>
            <span>Expenses & Income</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>Budget</strong>
            <span>By Category</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>Share</strong>
            <span>Household View</span>
          </div>
        </div>
      </div>
    </section>
  )
}
