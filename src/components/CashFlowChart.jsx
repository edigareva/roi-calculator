// The cumulative cash flow line chart. The dashed line at $0 is the break-even point:
// where a line crosses it, that investment has paid back its initial cost.
// In compare mode a second line (Investment B) is overlaid with a legend.
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts'
import { formatCurrency, CURRENCIES, SCENARIO_COLORS } from '../utils/calculations'

// Compact axis labels like €120k so the Y axis stays readable.
function shortMoney(value, symbol) {
  const abs = Math.abs(value)
  if (abs >= 1000) return `${symbol}${(value / 1000).toLocaleString('en-US')}k`
  return `${symbol}${value.toLocaleString('en-US')}`
}

// Merge one or two { month, cashFlow } series into rows keyed by month for Recharts.
function mergeSeries(seriesA, seriesB) {
  const months = Math.max(seriesA.length, seriesB ? seriesB.length : 0)
  const rows = []
  for (let i = 0; i < months; i++) {
    rows.push({
      month: i + 1,
      a: seriesA[i]?.cashFlow,
      b: seriesB ? seriesB[i]?.cashFlow : undefined,
    })
  }
  return rows
}

function CashFlowChart({ seriesA, seriesB, currency, compare }) {
  const symbol = CURRENCIES[currency]?.symbol ?? '$'
  const data = mergeSeries(seriesA, seriesB)

  return (
    <section className="chart">
      <h2 className="panel-title">Cumulative Cash Flow</h2>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              label={{ value: 'Month', position: 'insideBottom', offset: -4, fontSize: 12 }}
            />
            <YAxis tickFormatter={(v) => shortMoney(v, symbol)} tick={{ fontSize: 12 }} width={70} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(value, currency), name]}
              labelFormatter={(label) => `Month ${label}`}
            />
            {compare && <Legend />}
            {/* Break-even line at $0 — dashed gray */}
            <ReferenceLine
              y={0}
              stroke="#9ca3af"
              strokeDasharray="6 4"
              label={{ value: 'Break-even', position: 'insideTopRight', fontSize: 11, fill: '#6b7280' }}
            />
            <Line
              type="monotone"
              dataKey="a"
              name={compare ? 'Investment A' : 'Cash Flow'}
              stroke={SCENARIO_COLORS.A}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
            {compare && (
              <Line
                type="monotone"
                dataKey="b"
                name="Investment B"
                stroke={SCENARIO_COLORS.B}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default CashFlowChart
