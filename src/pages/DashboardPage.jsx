import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import './DashboardPage.css'

const summaryCards = [
  { label: 'Total Balance',     value: '₹0',  sub: 'Across all accounts', icon: '💳', color: 'card-blue'   },
  { label: 'Monthly Income',    value: '₹0',  sub: 'This month',          icon: '📈', color: 'card-green'  },
  { label: 'Monthly Expenses',  value: '₹0',  sub: 'This month',          icon: '📉', color: 'card-red'    },
  { label: 'Savings',           value: '₹0',  sub: 'This month',          icon: '💰', color: 'card-yellow' },
]

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Dashboard" />
        <div className="dashboard-content">

          <div className="summary-grid">
            {summaryCards.map((card) => (
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

          <div className="dashboard-panels">
            <div className="panel">
              <div className="panel-header">
                <h2>Recent Transactions</h2>
                <button className="panel-link">View all</button>
              </div>
              <div className="empty-state">
                <span>💸</span>
                <p>No transactions yet</p>
                <small>Add your first transaction to get started</small>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Budget Overview</h2>
                <button className="panel-link">Manage</button>
              </div>
              <div className="empty-state">
                <span>🎯</span>
                <p>No budgets set</p>
                <small>Set monthly budgets to track your spending</small>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Savings Goals</h2>
              <button className="panel-link">Add goal</button>
            </div>
            <div className="empty-state">
              <span>💰</span>
              <p>No goals yet</p>
              <small>Create a goal to start tracking your savings</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
