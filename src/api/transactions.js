const BASE = import.meta.env.VITE_API_URL

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export async function getTransactions({ month, year, type } = {}) {
  const params = new URLSearchParams()
  if (month) params.set('month', month)
  if (year)  params.set('year', year)
  if (type)  params.set('type', type)

  const res = await fetch(`${BASE}/api/transactions?${params}`, {
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch transactions')
  return data
}

export async function addTransaction(body) {
  const res = await fetch(`${BASE}/api/transactions`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to add transaction')
  return data
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE}/api/transactions/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to delete transaction')
  return data
}

export async function getCategories(type) {
  const params = type ? `?type=${type}` : ''
  const res = await fetch(`${BASE}/api/categories${params}`, {
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch categories')
  return data
}

export async function getDashboardSummary({ month, year } = {}) {
  const now = new Date()
  const params = new URLSearchParams({
    month: month || now.getMonth() + 1,
    year:  year  || now.getFullYear(),
  })
  const res = await fetch(`${BASE}/api/dashboard/summary?${params}`, {
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch summary')
  return data
}
