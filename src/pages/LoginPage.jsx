import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AuthPage.css'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // backend integration will go here
    console.log('Login:', form)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">T</span>
          <span>TrackWise</span>
        </Link>
        <div className="auth-left-content">
          <h2>Take control of your finances</h2>
          <ul className="auth-perks">
            <li><span className="perk-icon">📊</span> Track every expense & income</li>
            <li><span className="perk-icon">🏠</span> Share a household dashboard</li>
            <li><span className="perk-icon">🎯</span> Hit your savings goals</li>
            <li><span className="perk-icon">📈</span> See your financial trends</li>
          </ul>
          <div className="auth-quote">
            <p>"A budget is telling your money where to go instead of wondering where it went."</p>
            <span>Dave Ramsey</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="auth-sub">Sign in to your TrackWise account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="field">
              <div className="field-header">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit">Sign In</button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <button className="btn-google">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.2 33.6 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 2.9l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
            </svg>
            Continue with Google
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
