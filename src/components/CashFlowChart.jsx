// The cumulative cash flow line chart. The dashed line at $0 is the break-even point:
// where the line crosses it, the project has paid back the initial investment.
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { formatCurrency, CURRENCIES } from '../utils/calculations'

// Theme B (EPAM) accent used for the line.
const ACCENT = '#3399ff'

// Compact axis labels like €120k so the Y axis stays readable.
function shortMoney(value, symbol) {
  const abs = Math.abs(value)
  if (abs >= 1000) return `${symbol}${(value / 1000).toLocaleString('en-US')}k`
  return `${symbol}${value.toLocaleString('en-US')}`
}

function CashFlowChart({ data, currency }) {
  const symbol = CURRENCIES[currency]?.symbol ?? '$'
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
              formatter={(value) => [formatCurrency(value, currency), 'Cash Flow']}
              labelFormatter={(label) => `Month ${label}`}
            />
            {/* Break-even line at $0 — dashed gray */}
            <ReferenceLine
              y={0}
              stroke="#9ca3af"
              strokeDasharray="6 4"
              label={{ value: 'Break-even', position: 'insideTopRight', fontSize: 11, fill: '#6b7280' }}
            />
            <Line
              type="monotone"
              dataKey="cashFlow"
              stroke={ACCENT}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default CashFlowChart
