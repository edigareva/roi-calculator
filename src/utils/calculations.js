// Pure functions for ROI math. No React, no side effects — easy to test and reuse.

// Monthly Net Profit = Monthly Revenue − Monthly Costs
export function monthlyNetProfit(monthlyRevenue, monthlyCosts) {
  return monthlyRevenue - monthlyCosts
}

// Cumulative Cash Flow for month N = (Monthly Net Profit × N) − Initial Investment
export function cumulativeCashFlow(month, netProfit, initialInvestment) {
  return netProfit * month - initialInvestment
}

// Payback Period = ceil(Initial Investment / Monthly Net Profit) months.
// If Monthly Net Profit ≤ 0, the investment is never paid back.
export function paybackPeriod(initialInvestment, netProfit) {
  if (netProfit <= 0) return 'Never'
  return Math.ceil(initialInvestment / netProfit)
}

// Total Net Profit = (Monthly Net Profit × Period) − Initial Investment
export function totalNetProfit(netProfit, periodMonths, initialInvestment) {
  return netProfit * periodMonths - initialInvestment
}

// ROI % = (Total Net Profit / Initial Investment) × 100
export function roiPercent(totalProfit, initialInvestment) {
  if (initialInvestment === 0) return 0
  return (totalProfit / initialInvestment) * 100
}

// Build the { month, cashFlow } series used by the cash flow chart (months 1..period).
export function cashFlowSeries(netProfit, periodMonths, initialInvestment) {
  const series = []
  for (let month = 1; month <= periodMonths; month++) {
    series.push({
      month,
      cashFlow: cumulativeCashFlow(month, netProfit, initialInvestment),
    })
  }
  return series
}

// Convenience: compute every headline metric at once from the raw form inputs.
export function computeResults({ initialInvestment, monthlyRevenue, monthlyCosts, periodMonths }) {
  const netProfit = monthlyNetProfit(monthlyRevenue, monthlyCosts)
  const totalProfit = totalNetProfit(netProfit, periodMonths, initialInvestment)
  return {
    netProfit,
    totalProfit,
    roi: roiPercent(totalProfit, initialInvestment),
    payback: paybackPeriod(initialInvestment, netProfit),
    series: cashFlowSeries(netProfit, periodMonths, initialInvestment),
  }
}

// The currencies the user can pick from. Symbol is used for compact chart labels.
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', label: 'US Dollar (USD)' },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro (EUR)' },
  GBP: { code: 'GBP', symbol: '£', label: 'British Pound (GBP)' },
}

// Format a number in the chosen currency with commas, e.g. 100000 -> "$100,000" / "€100,000".
// We use the en-US locale so the thousands separator stays a comma across currencies.
export function formatCurrency(value, currency = 'USD') {
  const rounded = Math.round(value)
  return rounded.toLocaleString('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })
}

// Format a percentage with one decimal and commas, e.g. 250 -> "250.0%".
export function formatPercent(value) {
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`
}
