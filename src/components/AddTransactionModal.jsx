import { useState, useEffect } from 'react'
import { addTransaction, getCategories } from '../api/transactions'
import './AddTransactionModal.css'

const today = new Date().toISOString().split('T')[0]

function emptyForm() {
  return { type: 'expense', categoryId: '', amount: '', date: today, description: '', isRecurring: false, recurringInterval: 'monthly' }
}

export default function AddTransactionModal({ onClose, onAdded }) {
  const [form, setForm]         = useState(emptyForm())
  const [categories, setCategories] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    getCategories(form.type).then(setCategories).catch(() => {})
  }, [form.type])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (name === 'type') setForm((prev) => ({ ...prev, type: value, categoryId: '' }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.categoryId) { setError('Please select a category'); return }
    setLoading(true)
    try {
      const tx = await addTransaction({
        ...form,
        amount: parseFloat(form.amount),
      })
      onAdded(tx)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Type toggle */}
          <div className="type-toggle">
            <button type="button"
              className={`type-btn expense ${form.type === 'expense' ? 'active' : ''}`}
              onClick={() => setForm({ ...emptyForm(), type: 'expense' })}>
              📉 Expense
            </button>
            <button type="button"
              className={`type-btn income ${form.type === 'income' ? 'active' : ''}`}
              onClick={() => setForm({ ...emptyForm(), type: 'income' })}>
              📈 Income
            </button>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Amount (₹)</label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Description <span className="optional">(optional)</span></label>
            <input
              type="text"
              name="description"
              placeholder="e.g. Monthly groceries at Big Bazaar"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="recurring-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isRecurring"
                checked={form.isRecurring}
                onChange={handleChange}
              />
              Recurring transaction
            </label>
            {form.isRecurring && (
              <select name="recurringInterval" value={form.recurringInterval} onChange={handleChange}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add" disabled={loading}>
              {loading ? 'Adding...' : `Add ${form.type === 'expense' ? 'Expense' : 'Income'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
