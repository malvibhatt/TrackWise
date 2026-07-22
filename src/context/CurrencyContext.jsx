import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { formatCurrency as fmtCurrency, formatDate as fmtDate } from '../utils/formatters'

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹',  locale: 'en-IN', name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$',  locale: 'en-US', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€',  locale: 'de-DE', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£',  locale: 'en-GB', name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥',  locale: 'ja-JP', name: 'Japanese Yen' },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar' },
}

const STORAGE_KEY = 'currency'
const DEFAULT_CODE = 'CAD'

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored && CURRENCIES[stored] ? stored : DEFAULT_CODE
  })

  const currency = CURRENCIES[code]

  const setCurrency = useCallback((nextCode) => {
    if (!CURRENCIES[nextCode]) return
    localStorage.setItem(STORAGE_KEY, nextCode)
    setCode(nextCode)
  }, [])

  const formatCurrency = useCallback((amount) => fmtCurrency(amount, currency), [currency])
  const formatDate = useCallback((dateStr) => fmtDate(dateStr, currency), [currency])

  const value = useMemo(
    () => ({ currency, setCurrency, formatCurrency, formatDate }),
    [currency, setCurrency, formatCurrency, formatDate],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider')
  return ctx
}
