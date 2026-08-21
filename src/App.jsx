import { useMemo, useState } from 'react'
import InputForm from './components/InputForm'
import Results from './components/Results'
import CashFlowChart from './components/CashFlowChart'
import { computeResults } from './utils/calculations'

function App() {
  // All four form values live here so the whole app updates as the user types.
  const [values, setValues] = useState({
    initialInvestment: 100000,
    monthlyRevenue: 15000,
    monthlyCosts: 5000,
    periodMonths: 12,
  })

  // The display currency for every money value in the app.
  const [currency, setCurrency] = useState('USD')

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  // Recompute metrics whenever an input changes.
  const results = useMemo(() => computeResults(values), [values])

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">ROI</span>
          <span className="brand-name">Calculator</span>
        </div>
        <InputForm
          values={values}
          onChange={handleChange}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      </aside>

      <main className="content">
        <header className="content-header">
          <h1>Business ROI Calculator</h1>
          <p>See your return on investment and break-even point instantly.</p>
        </header>

        <Results
          roi={results.roi}
          payback={results.payback}
          totalProfit={results.totalProfit}
          currency={currency}
        />
        <CashFlowChart data={results.series} currency={currency} />
      </main>
    </div>
  )
}

export default App
