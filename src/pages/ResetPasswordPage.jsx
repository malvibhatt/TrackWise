import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../api/auth'
import './AuthPage.css'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    if (!token) {
      setError('Invalid reset link. Please request a new one.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await resetPassword(token, form.password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
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
          <h2>Almost there</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Choose a strong new password. We recommend using a mix of letters,
            numbers and symbols.
          </p>
          <div className="auth-quote">
            <p>"It's not about how much money you make, but how much money you keep."</p>
            <span>Robert Kiyosaki</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          {success ? (
            <div className="auth-success-state">
              <div className="success-icon">✅</div>
              <h1>Password reset!</h1>
              <p className="auth-sub">
                Your password has been updated successfully.
                Redirecting you to login in a moment...
              </p>
              <Link to="/login" className="btn-submit" style={{ display: 'block', textAlign: 'center', marginTop: 24, textDecoration: 'none' }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <h1>Set new password</h1>
              <p className="auth-sub">Must be at least 6 characters</p>

              {!token && (
                <div className="alert alert-error">
                  Invalid or missing reset token.{' '}
                  <Link to="/forgot-password">Request a new link</Link>
                </div>
              )}

              {error && <div className="alert alert-error">{error}</div>}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="password">New password</label>
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
                </div>

                <div className="field">
                  <label htmlFor="confirm">Confirm new password</label>
                  <input
                    id="confirm"
                    type={showPassword ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Repeat your new password"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  {form.confirm && form.password !== form.confirm && (
                    <span className="field-error">Passwords do not match</span>
                  )}
                </div>

                <button type="submit" className="btn-submit" disabled={loading || !token}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

              <p className="auth-switch">
                <Link to="/login">Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
