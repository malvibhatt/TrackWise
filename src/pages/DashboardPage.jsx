import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import AddTransactionModal from '../components/AddTransactionModal'
import { getDashboardSummary, getTransactions } from '../api/transactions'
import { useCurrency } from '../context/CurrencyContext.jsx'
import './DashboardPage.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { formatCurrency, formatDate } = useCurrency()
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  const [summary, setSummary]         = useState(null)
  const [recentTxns, setRecentTxns]   = useState([])
  const [showModal, setShowModal]     = useState(false)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [sum, txns] = await Promise.all([
          getDashboardSummary({ month: currentMonth, year: currentYear }),
          getTransactions({ month: currentMonth, year: currentYear }),
        ])
        setSummary(sum)
        setRecentTxns(txns.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentMonth, currentYear])

  function handleAdded(newTx) {
    setRecentTxns((prev) => [newTx, ...prev].slice(0, 5))
    getDashboardSummary({ month: currentMonth, year: currentYear })
      .then(setSummary)
      .catch(() => {})
  }

  const cards = summary ? [
    { label: 'Total Balance',    value: formatCurrency(summary.totalBalance),    sub: 'All time',      icon: '💳', color: 'card-blue'   },
    { label: 'Monthly Income',   value: formatCurrency(summary.monthlyIncome),   sub: 'This month',    icon: '📈', color: 'card-green'  },
    { label: 'Monthly Expenses', value: formatCurrency(summary.monthlyExpenses), sub: 'This month',    icon: '📉', color: 'card-red'    },
    { label: 'Monthly Savings',  value: formatCurrency(summary.monthlySavings),  sub: 'This month',    icon: '💰', color: 'card-yellow' },
  ] : []

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Dashboard" />
        <div className="dashboard-content">

          {/* Summary cards */}
          {loading ? (
            <div className="summary-grid">
              {[1,2,3,4].map(i => <div key={i} className="summary-card skeleton" />)}
            </div>
          ) : (
            <div className="summary-grid">
              {cards.map((card) => (
                <div className={`summary-card ${card.color}`} key={card.label}>
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-info">
                    <p className="card-label">{card.label}</p>
                    <p className="card-value">{card.value}</p>
                    <p className="card-sub">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="dashboard-panels">
            {/* Recent Transactions */}
            <div className="panel">
              <div className="panel-header">
                <h2>Recent Transactions</h2>
                <button className="panel-link" onClick={() => navigate('/transactions')}>View all</button>
              </div>
              {recentTxns.length === 0 ? (
                <div className="empty-state">
                  <span>💸</span>
                  <p>No transactions yet</p>
                  <small>Add your first transaction to get started</small>
                  <button className="panel-cta" onClick={() => setShowModal(true)}>+ Add Transaction</button>
                </div>
              ) : (
                <div className="recent-list">
                  {recentTxns.map((tx) => (
                    <div key={tx.id} className="recent-row">
                      <div className="recent-icon" style={{ background: tx.category?.color + '20' }}>
                        {tx.category?.icon}
                      </div>
                      <div className="recent-info">
                        <span className="recent-cat">{tx.category?.name}</span>
                        <span className="recent-date">{formatDate(tx.date)}</span>
                      </div>
                      <span className={`recent-amount ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                    </div>
                  ))}
                  <button className="panel-cta mt" onClick={() => setShowModal(true)}>+ Add Transaction</button>
                </div>
              )}
            </div>

            {/* Budget Overview */}
            <div className="panel">
              <div className="panel-header">
                <h2>Budget Overview</h2>
                <button className="panel-link" onClick={() => navigate('/budgets')}>Manage</button>
              </div>
              <div className="empty-state">
                <span>🎯</span>
                <p>No budgets set</p>
                <small>Set monthly budgets to track your spending</small>
                <button className="panel-cta" onClick={() => navigate('/budgets')}>Set Budgets</button>
              </div>
            </div>
          </div>

          {/* Savings Goals */}
          <div className="panel">
            <div className="panel-header">
              <h2>Savings Goals</h2>
              <button className="panel-link" onClick={() => navigate('/goals')}>Add goal</button>
            </div>
            <div className="empty-state">
              <span>💰</span>
              <p>No goals yet</p>
              <small>Create a goal to start tracking your savings</small>
              <button className="panel-cta" onClick={() => navigate('/goals')}>Create Goal</button>
            </div>
          </div>

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
