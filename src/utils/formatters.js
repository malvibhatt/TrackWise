const DEFAULT_CURRENCY = { symbol: '₹', locale: 'en-IN' }

export function formatCurrency(amount, currency = DEFAULT_CURRENCY) {
  const { symbol, locale } = currency
  return `${symbol}${Number(amount).toLocaleString(locale, { minimumFractionDigits: 2 })}`
}

export function formatDate(dateStr, currency = DEFAULT_CURRENCY) {
  return new Date(dateStr).toLocaleDateString(currency.locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

export function groupByDate(transactions) {
  return transactions.reduce((groups, tx) => {
    const date = new Date(tx.date).toDateString()
    if (!groups[date]) groups[date] = []
    groups[date].push(tx)
    return groups
  }, {})
}
