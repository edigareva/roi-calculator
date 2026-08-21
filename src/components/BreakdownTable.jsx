// Month-by-month breakdown below the chart. Revenue, costs and net profit are the
// same every month (they're fixed inputs); the cumulative cash flow is what grows.
// The break-even month — the first month cumulative cash flow reaches $0 or more —
// is highlighted in green.
import { formatCurrency, monthlyNetProfit } from '../utils/calculations'

function BreakdownTable({ values, series, currency, title, accentColor }) {
  const netProfit = monthlyNetProfit(values.monthlyRevenue, values.monthlyCosts)

  // First month where the investment has paid for itself (cumulative >= 0).
  const breakEvenMonth = series.find((row) => row.cashFlow >= 0)?.month ?? null

  return (
    <div className="breakdown">
      {title && (
        <h3 className="scenario-title" style={{ color: accentColor }}>
          <span className="scenario-dot" style={{ background: accentColor }} />
          {title}
        </h3>
      )}
      <div className="breakdown-scroll">
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Costs</th>
              <th>Net Profit</th>
              <th>Cumulative Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {series.map((row) => {
              const isBreakEven = row.month === breakEvenMonth
              return (
                <tr key={row.month} className={isBreakEven ? 'break-even-row' : ''}>
                  <td>
                    {row.month}
                    {isBreakEven && <span className="break-even-tag">break-even</span>}
                  </td>
                  <td>{formatCurrency(values.monthlyRevenue, currency)}</td>
                  <td>{formatCurrency(values.monthlyCosts, currency)}</td>
                  <td className={netProfit >= 0 ? 'pos' : 'neg'}>
                    {formatCurrency(netProfit, currency)}
                  </td>
                  <td className={row.cashFlow >= 0 ? 'pos' : 'neg'}>
                    {formatCurrency(row.cashFlow, currency)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!breakEvenMonth && (
        <p className="breakdown-note">
          This investment never breaks even within the selected period.
        </p>
      )}
    </div>
  )
}

export default BreakdownTable
