const BASE = import.meta.env.VITE_API_URL

async function request(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

export function registerUser(name, email, password) {
  return request('/api/auth/register', { name, email, password })
}

export function loginUser(email, password) {
  return request('/api/auth/login', { email, password })
}

export function forgotPassword(email) {
  return request('/api/auth/forgot-password', { email })
}

export function resetPassword(token, password) {
  return request('/api/auth/reset-password', { token, password })
}
