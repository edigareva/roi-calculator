// A reusable set of the four ROI inputs. In single mode one is shown; in compare
// mode two are shown (Scenario A and Scenario B), each with its own title and color.
// The currency is chosen once for the whole app, so it lives outside this form.

function InputForm({ values, onChange, currencySymbol, title, accentColor }) {
  // Keep numbers as numbers; empty input becomes 0 so the math never breaks.
  const handleNumber = (field) => (event) => {
    const raw = event.target.value
    onChange(field, raw === '' ? 0 : Number(raw))
  }

  const handlePeriod = (event) => {
    onChange('periodMonths', Number(event.target.value))
  }

  return (
    <div className="input-form">
      {title && (
        <h3 className="scenario-title" style={{ color: accentColor }}>
          <span className="scenario-dot" style={{ background: accentColor }} />
          {title}
        </h3>
      )}

      <label className="field">
        <span>Initial Investment ({currencySymbol})</span>
        <input
          type="number"
          min="0"
          value={values.initialInvestment}
          onChange={handleNumber('initialInvestment')}
        />
      </label>

      <label className="field">
        <span>Expected Monthly Revenue ({currencySymbol})</span>
        <input
          type="number"
          min="0"
          value={values.monthlyRevenue}
          onChange={handleNumber('monthlyRevenue')}
        />
      </label>

      <label className="field">
        <span>Monthly Operating Costs ({currencySymbol})</span>
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
    </div>
  )
}

export default InputForm
