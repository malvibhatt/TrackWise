import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import AddTransactionModal from '../components/AddTransactionModal'
import { getTransactions, deleteTransaction } from '../api/transactions'
import './TransactionsPage.css'

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function groupByDate(transactions) {
  return transactions.reduce((groups, tx) => {
    const date = new Date(tx.date).toDateString()
    if (!groups[date]) groups[date] = []
    groups[date].push(tx)
    return groups
  }, {})
}

export default function TransactionsPage() {
  const now = new Date()
  const [month, setMonth]             = useState(now.getMonth() + 1)
  const [year, setYear]               = useState(now.getFullYear())
  const [typeFilter, setTypeFilter]   = useState('all')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]         = useState(true)
  const [showModal, setShowModal]     = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await getTransactions({
          month,
          year,
          type: typeFilter !== 'all' ? typeFilter : undefined,
        })
        setTransactions(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [month, year, typeFilter])

  async function handleDelete(id) {
    if (!confirm('Delete this transaction?')) return
    try {
      await deleteTransaction(id)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  function handleAdded(newTx) {
    setTransactions((prev) => [newTx, ...prev])
  }

  const totalIncome   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  const grouped       = groupByDate(transactions)

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Transactions" />
        <div className="dashboard-content">

          {/* Toolbar */}
          <div className="tx-toolbar">
            <div className="tx-filters">
              <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <div className="type-filter">
                {['all', 'income', 'expense'].map(t => (
                  <button key={t}
                    className={`filter-btn ${typeFilter === t ? 'active' : ''} ${t}`}
                    onClick={() => setTypeFilter(t)}>
                    {t === 'all' ? 'All' : t === 'income' ? '📈 Income' : '📉 Expense'}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-add-tx" onClick={() => setShowModal(true)}>
              + Add Transaction
            </button>
          </div>

          {/* Summary strip */}
          <div className="tx-summary">
            <div className="tx-summary-item income">
              <span>Total Income</span>
              <strong>{formatCurrency(totalIncome)}</strong>
            </div>
            <div className="tx-summary-item expense">
              <span>Total Expenses</span>
              <strong>{formatCurrency(totalExpenses)}</strong>
            </div>
            <div className="tx-summary-item savings">
              <span>Net Savings</span>
              <strong>{formatCurrency(totalIncome - totalExpenses)}</strong>
            </div>
          </div>

          {/* Transaction list */}
          {loading ? (
            <div className="tx-loading">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="tx-empty">
              <span>💸</span>
              <p>No transactions found</p>
              <small>Add your first transaction using the button above</small>
            </div>
          ) : (
            <div className="tx-list">
              {Object.entries(grouped).map(([date, txns]) => (
                <div key={date} className="tx-group">
                  <div className="tx-date-label">{formatDate(txns[0].date)}</div>
                  {txns.map((tx) => (
                    <div key={tx.id} className="tx-row">
                      <div className="tx-icon" style={{ background: tx.category?.color + '20' }}>
                        {tx.category?.icon}
                      </div>
                      <div className="tx-info">
                        <span className="tx-category">{tx.category?.name}</span>
                        {tx.description && <span className="tx-desc">{tx.description}</span>}
                      </div>
                      {tx.isRecurring && <span className="tx-badge">🔄 {tx.recurringInterval}</span>}
                      <div className={`tx-amount ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </div>
                      <button className="tx-delete" onClick={() => handleDelete(tx.id)} title="Delete">✕</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdded={handleAdded}
        />
      )}
    </div>
  )
}
