import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, groupByDate } from './formatters'

// ─── formatCurrency ───────────────────────────────────────────────────────────

describe('formatCurrency', () => {
  it('formats a whole number with two decimal places', () => {
    expect(formatCurrency(1000)).toBe('₹1,000.00')
  })

  it('formats a decimal amount correctly', () => {
    expect(formatCurrency(1234.5)).toBe('₹1,234.50')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('₹0.00')
  })

  it('formats large amounts with Indian comma grouping', () => {
    // Indian locale: 1,00,000 (lakh format)
    const result = formatCurrency(100000)
    expect(result).toMatch(/^₹/)
    expect(result).toContain('00.00')
  })

  it('handles a numeric string input', () => {
    // Number("500") === 500, so this should work
    expect(formatCurrency('500')).toBe('₹500.00')
  })

  it('formats negative amounts', () => {
    const result = formatCurrency(-250)
    expect(result).toMatch(/^₹-/)
    expect(result).toContain('250.00')
  })

  it('uses the provided currency symbol and locale', () => {
    const usd = { symbol: '$', locale: 'en-US' }
    expect(formatCurrency(1000, usd)).toBe('$1,000.00')
  })

  it('formats with the Euro symbol', () => {
    const eur = { symbol: '€', locale: 'de-DE' }
    const result = formatCurrency(1234.5, eur)
    expect(result.startsWith('€')).toBe(true)
    expect(result).toContain('1.234,50')
  })
})

// ─── formatDate ──────────────────────────────────────────────────────────────

describe('formatDate', () => {
  it('returns a string with a recognisable month abbreviation', () => {
    const result = formatDate('2025-01-15')
    // en-IN locale: "15 Jan 2025"
    expect(result).toContain('Jan')
    expect(result).toContain('2025')
  })

  it('includes the day number', () => {
    // Use T12:00:00Z (noon UTC) so the date never shifts due to local timezone offset
    const result = formatDate('2025-07-04T12:00:00Z')
    expect(result).toContain('4')
  })

  it('formats December correctly', () => {
    const result = formatDate('2024-12-31')
    expect(result).toContain('Dec')
    expect(result).toContain('2024')
  })

  it('honours the provided locale', () => {
    const de = { symbol: '€', locale: 'de-DE' }
    const result = formatDate('2025-01-15', de)
    // de-DE short month for January is "Jan."
    expect(result).toMatch(/Jan/)
    expect(result).toContain('2025')
  })
})

// ─── groupByDate ─────────────────────────────────────────────────────────────

describe('groupByDate', () => {
  it('returns an empty object for an empty array', () => {
    expect(groupByDate([])).toEqual({})
  })

  it('groups a single transaction under its date key', () => {
    const tx = { id: 1, date: '2025-06-01', amount: 500, type: 'income' }
    const groups = groupByDate([tx])
    const keys = Object.keys(groups)
    expect(keys).toHaveLength(1)
    expect(groups[keys[0]]).toEqual([tx])
  })

  it('puts two transactions on the same date in the same group', () => {
    const tx1 = { id: 1, date: '2025-06-01', amount: 200 }
    const tx2 = { id: 2, date: '2025-06-01', amount: 300 }
    const groups = groupByDate([tx1, tx2])
    const keys = Object.keys(groups)
    expect(keys).toHaveLength(1)
    expect(groups[keys[0]]).toHaveLength(2)
  })

  it('puts transactions on different dates in separate groups', () => {
    const tx1 = { id: 1, date: '2025-06-01', amount: 200 }
    const tx2 = { id: 2, date: '2025-06-02', amount: 300 }
    const groups = groupByDate([tx1, tx2])
    expect(Object.keys(groups)).toHaveLength(2)
  })

  it('preserves transaction order within a group', () => {
    const tx1 = { id: 1, date: '2025-06-01', amount: 100 }
    const tx2 = { id: 2, date: '2025-06-01', amount: 200 }
    const tx3 = { id: 3, date: '2025-06-01', amount: 300 }
    const groups = groupByDate([tx1, tx2, tx3])
    const items = groups[Object.keys(groups)[0]]
    expect(items[0].id).toBe(1)
    expect(items[2].id).toBe(3)
  })

  it('handles three dates producing three groups', () => {
    const txns = [
      { id: 1, date: '2025-01-01' },
      { id: 2, date: '2025-02-01' },
      { id: 3, date: '2025-03-01' },
    ]
    expect(Object.keys(groupByDate(txns))).toHaveLength(3)
  })
})
