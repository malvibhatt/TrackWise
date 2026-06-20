import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../api/auth'
import './AuthPage.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await forgotPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">T</span>
          <span>TrackWise</span>
        </Link>
        <div className="auth-left-content">
          <h2>Don't worry, it happens</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Enter your email and we'll send you a secure link to reset your password.
            The link expires in 1 hour.
          </p>
          <div className="auth-quote">
            <p>"Financial freedom is available to those who learn about it and work for it."</p>
            <span>Robert Kiyosaki</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          {submitted ? (
            <div className="auth-success-state">
              <div className="success-icon">📬</div>
              <h1>Check your inbox</h1>
              <p className="auth-sub">
                We sent a password reset link to <strong>{email}</strong>.
                Check your email and click the link to continue.
              </p>
              <p className="auth-sub" style={{ marginTop: 12 }}>
                Didn't get it? Check your spam folder or{' '}
                <button className="inline-btn" onClick={() => setSubmitted(false)}>
                  try again
                </button>
              </p>
              <Link to="/login" className="btn-submit" style={{ display: 'block', textAlign: 'center', marginTop: 24, textDecoration: 'none' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1>Forgot password?</h1>
              <p className="auth-sub">Enter your email to receive a reset link</p>

              {error && <div className="alert alert-error">{error}</div>}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    required
                    autoComplete="email"
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <p className="auth-switch">
                Remembered it? <Link to="/login">Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
