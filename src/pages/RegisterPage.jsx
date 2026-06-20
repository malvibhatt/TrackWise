import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AuthPage.css'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      alert('Passwords do not match')
      return
    }
    // backend integration will go here
    console.log('Register:', form)
  }

  const passwordStrength = getPasswordStrength(form.password)

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">T</span>
          <span>TrackWise</span>
        </Link>
        <div className="auth-left-content">
          <h2>Start your financial journey today</h2>
          <ul className="auth-perks">
            <li><span className="perk-icon">✅</span> Free to use, always</li>
            <li><span className="perk-icon">🔒</span> Your data stays private</li>
            <li><span className="perk-icon">👨‍👩‍👧</span> Invite household members</li>
            <li><span className="perk-icon">📱</span> Works on any device</li>
          </ul>
          <div className="auth-quote">
            <p>"Do not save what is left after spending, but spend what is left after saving."</p>
            <span>Warren Buffett</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p className="auth-sub">Join TrackWise and take charge of your money</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

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
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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
              {form.password && (
                <div className="strength-bar">
                  <div className={`strength-fill strength-${passwordStrength.level}`} />
                  <span className={`strength-label strength-${passwordStrength.level}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                name="confirm"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {form.confirm && form.password !== form.confirm && (
                <span className="field-error">Passwords do not match</span>
              )}
            </div>

            <button type="submit" className="btn-submit">Create Account</button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <button className="btn-google">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.2 33.6 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 2.9l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
            </svg>
            Continue with Google
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function getPasswordStrength(password) {
  if (!password) return { level: 'none', label: '' }
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length
  if (score <= 1) return { level: 'weak', label: 'Weak' }
  if (score === 2) return { level: 'fair', label: 'Fair' }
  if (score === 3) return { level: 'good', label: 'Good' }
  return { level: 'strong', label: 'Strong' }
}
