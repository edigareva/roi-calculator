// The form on the left side. It holds the four inputs the user fills in.
// It doesn't do any math itself — it just reports changes up to App.jsx.

import { CURRENCIES } from '../utils/calculations'

function InputForm({ values, onChange, currency, onCurrencyChange }) {
  // Keep numbers as numbers; empty input becomes 0 so the math never breaks.
  const handleNumber = (field) => (event) => {
    const raw = event.target.value
    onChange(field, raw === '' ? 0 : Number(raw))
  }

  const handlePeriod = (event) => {
    onChange('periodMonths', Number(event.target.value))
  }

  // Show the selected currency's symbol in the money field labels.
  const symbol = CURRENCIES[currency]?.symbol ?? '$'

  return (
    <form className="input-form" onSubmit={(e) => e.preventDefault()}>
      <h2 className="panel-title">Your Numbers</h2>

      <label className="field">
        <span>Currency</span>
        <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
          {Object.values(CURRENCIES).map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Initial Investment ({symbol})</span>
        <input
          type="number"
          min="0"
          value={values.initialInvestment}
          onChange={handleNumber('initialInvestment')}
        />
      </label>

      <label className="field">
        <span>Expected Monthly Revenue ({symbol})</span>
        <input
          type="number"
          min="0"
          value={values.monthlyRevenue}
          onChange={handleNumber('monthlyRevenue')}
        />
      </label>

      <label className="field">
        <span>Monthly Operating Costs ({symbol})</span>
        <input
          type="number"
          min="0"
          value={values.monthlyCosts}
          onChange={handleNumber('monthlyCosts')}
        />
      </label>

      <label className="field">
        <span>Calculation Period (months)</span>
        <select value={values.periodMonths} onChange={handlePeriod}>
          <option value={12}>12 months</option>
          <option value={24}>24 months</option>
          <option value={36}>36 months</option>
        </select>
      </label>
    </form>
  )
}

export default InputForm
