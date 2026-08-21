// Shows the three headline numbers: ROI %, payback period, and total net profit.
import { formatCurrency, formatPercent } from '../utils/calculations'

function Results({ roi, payback, totalProfit, currency }) {
  const paybackText = payback === 'Never' ? 'Never' : `${payback} mo`
  const roiPositive = roi >= 0
  const profitPositive = totalProfit >= 0

  return (
    <section className="results">
      <h2 className="panel-title">Results</h2>
      <div className="metric-grid">
        <div className="metric-card">
          <span className="metric-label">Return on Investment</span>
          <span className={`metric-value ${roiPositive ? 'positive' : 'negative'}`}>
            {formatPercent(roi)}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Payback Period</span>
          <span className={`metric-value ${payback === 'Never' ? 'negative' : ''}`}>
            {paybackText}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Total Net Profit</span>
          <span className={`metric-value ${profitPositive ? 'positive' : 'negative'}`}>
            {formatCurrency(totalProfit, currency)}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Results
