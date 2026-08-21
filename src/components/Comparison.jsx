// Side-by-side comparison of two scenarios. The "winner" is the one that puts
// more actual money in your pocket over the period (higher Total Net Profit).
import { formatCurrency, formatPercent, SCENARIO_COLORS } from '../utils/calculations'

function paybackText(payback) {
  return payback === 'Never' ? 'Never' : `${payback} mo`
}

function Comparison({ resultsA, resultsB, currency }) {
  // Decide the winner by total net profit. A tie is possible (equal profit).
  let verdict
  if (resultsA.totalProfit > resultsB.totalProfit) verdict = 'A'
  else if (resultsB.totalProfit > resultsA.totalProfit) verdict = 'B'
  else verdict = 'tie'

  const diff = Math.abs(resultsA.totalProfit - resultsB.totalProfit)

  const banner =
    verdict === 'tie'
      ? { text: 'Both investments earn the same total profit.', color: '#6b7280' }
      : {
          text: `Investment ${verdict} is more profitable — by ${formatCurrency(diff, currency)} over the period.`,
          color: SCENARIO_COLORS[verdict],
        }

  const rows = [
    {
      label: 'Return on Investment',
      a: formatPercent(resultsA.roi),
      b: formatPercent(resultsB.roi),
    },
    {
      label: 'Payback Period',
      a: paybackText(resultsA.payback),
      b: paybackText(resultsB.payback),
    },
    {
      label: 'Total Net Profit',
      a: formatCurrency(resultsA.totalProfit, currency),
      b: formatCurrency(resultsB.totalProfit, currency),
      decisive: true, // the metric that determines the winner
    },
  ]

  return (
    <section className="results comparison">
      <h2 className="panel-title">Comparison</h2>

      <div className="verdict" style={{ borderColor: banner.color, color: banner.color }}>
        {verdict !== 'tie' && <span className="trophy">🏆</span>}
        {banner.text}
      </div>

      <table className="compare-table">
        <thead>
          <tr>
            <th></th>
            <th>
              <span className="scenario-dot" style={{ background: SCENARIO_COLORS.A }} />
              Investment A
            </th>
            <th>
              <span className="scenario-dot" style={{ background: SCENARIO_COLORS.B }} />
              Investment B
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            // Highlight the better cell on the decisive (total profit) row only.
            const aWins = row.decisive && verdict === 'A'
            const bWins = row.decisive && verdict === 'B'
            return (
              <tr key={row.label}>
                <td className="row-label">{row.label}</td>
                <td className={aWins ? 'winner-cell' : ''}>{row.a}</td>
                <td className={bWins ? 'winner-cell' : ''}>{row.b}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default Comparison
