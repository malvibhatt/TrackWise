export function getPasswordStrength(password) {
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
