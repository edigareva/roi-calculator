import { useMemo, useState } from 'react'
import InputForm from './components/InputForm'
import Results from './components/Results'
import Comparison from './components/Comparison'
import CashFlowChart from './components/CashFlowChart'
import { computeResults, CURRENCIES, SCENARIO_COLORS } from './utils/calculations'

const DEFAULT_A = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
  periodMonths: 12,
}

// Scenario B starts as a slightly different alternative so the comparison is meaningful.
const DEFAULT_B = {
  initialInvestment: 150000,
  monthlyRevenue: 22000,
  monthlyCosts: 8000,
  periodMonths: 12,
}

function App() {
  const [mode, setMode] = useState('single') // 'single' | 'compare'
  const [valuesA, setValuesA] = useState(DEFAULT_A)
  const [valuesB, setValuesB] = useState(DEFAULT_B)
  const [currency, setCurrency] = useState('USD')

  const changeA = (field, value) => setValuesA((prev) => ({ ...prev, [field]: value }))
  const changeB = (field, value) => setValuesB((prev) => ({ ...prev, [field]: value }))

  const resultsA = useMemo(() => computeResults(valuesA), [valuesA])
  const resultsB = useMemo(() => computeResults(valuesB), [valuesB])

  const compare = mode === 'compare'
  const currencySymbol = CURRENCIES[currency]?.symbol ?? '$'

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">ROI</span>
          <span className="brand-name">Calculator</span>
        </div>

        {/* Mode toggle: single investment vs. compare two */}
        <div className="mode-toggle" role="group" aria-label="Calculator mode">
          <button
            className={!compare ? 'active' : ''}
            onClick={() => setMode('single')}
          >
            Single
          </button>
          <button
            className={compare ? 'active' : ''}
            onClick={() => setMode('compare')}
          >
            Compare
          </button>
        </div>

        <label className="field">
          <span>Currency</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        {compare ? (
          <>
            <InputForm
              values={valuesA}
              onChange={changeA}
              currencySymbol={currencySymbol}
              title="Investment A"
              accentColor={SCENARIO_COLORS.A}
            />
            <InputForm
              values={valuesB}
              onChange={changeB}
              currencySymbol={currencySymbol}
              title="Investment B"
              accentColor={SCENARIO_COLORS.B}
            />
          </>
        ) : (
          <InputForm values={valuesA} onChange={changeA} currencySymbol={currencySymbol} />
        )}
      </aside>

      <main className="content">
        <header className="content-header">
          <h1>Business ROI Calculator</h1>
          <p>
            {compare
              ? 'Compare two investments side by side and see which is more profitable.'
              : 'See your return on investment and break-even point instantly.'}
          </p>
        </header>

        {compare ? (
          <Comparison resultsA={resultsA} resultsB={resultsB} currency={currency} />
        ) : (
          <Results
            roi={resultsA.roi}
            payback={resultsA.payback}
            totalProfit={resultsA.totalProfit}
            currency={currency}
          />
        )}

        <CashFlowChart
          seriesA={resultsA.series}
          seriesB={compare ? resultsB.series : undefined}
          currency={currency}
          compare={compare}
        />
      </main>
    </div>
  )
}

export default App
