// A reusable set of the four ROI inputs. In single mode one is shown; in compare
// mode two are shown (Scenario A and Scenario B), each with its own title and color.
// The currency is chosen once for the whole app, so it lives outside this form.

function InputForm({ values, onChange, currencySymbol, title, accentColor, errors = {} }) {
  // Keep an empty field empty (so we can flag "required"); otherwise store a number.
  const handleNumber = (field) => (event) => {
    const raw = event.target.value
    onChange(field, raw === '' ? '' : Number(raw))
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

      <label className={`field${errors.initialInvestment ? ' has-error' : ''}`}>
        <span>Initial Investment ({currencySymbol})</span>
        <input
          type="number"
          value={values.initialInvestment}
          onChange={handleNumber('initialInvestment')}
        />
        {errors.initialInvestment && <span className="field-error">{errors.initialInvestment}</span>}
      </label>

      <label className={`field${errors.monthlyRevenue ? ' has-error' : ''}`}>
        <span>Expected Monthly Revenue ({currencySymbol})</span>
        <input
          type="number"
          value={values.monthlyRevenue}
          onChange={handleNumber('monthlyRevenue')}
        />
        {errors.monthlyRevenue && <span className="field-error">{errors.monthlyRevenue}</span>}
      </label>

      <label className={`field${errors.monthlyCosts ? ' has-error' : ''}`}>
        <span>Monthly Operating Costs ({currencySymbol})</span>
        <input
          type="number"
          value={values.monthlyCosts}
          onChange={handleNumber('monthlyCosts')}
        />
        {errors.monthlyCosts && <span className="field-error">{errors.monthlyCosts}</span>}
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
