# Business ROI Calculator

A simple web app that helps you understand an investment at a glance: how much
return you get, how long until you break even, and how two investments compare.

### 🔗 Live app: **https://edigareva.github.io/roi-calculator/**

Just open the link — nothing to install.

![Built with React](https://img.shields.io/badge/built%20with-React-39f)
![Vite](https://img.shields.io/badge/bundler-Vite-646cff)

---

## What it does

- **ROI metrics** — enter your initial investment, monthly revenue, monthly
  costs, and a time period, and instantly see your ROI %, payback period, and
  total net profit.
- **Cash-flow chart** — a line chart of cumulative cash flow over time, with a
  dashed line marking the break-even point.
- **Monthly breakdown table** — month-by-month revenue, costs, net profit, and
  running cash flow, with the break-even month highlighted in green.
- **Compare mode** — enter two sets of numbers side by side and see which
  investment is more profitable.
- **Currency** — switch between USD, EUR, and GBP; every number updates.
- **Input checks** — friendly warnings if a field is empty, the investment is
  zero or negative, or costs are higher than revenue.
- **Export to PDF** — save a clean one-page report of your results and chart.
- **Embed** — copy a snippet to drop the calculator into your own website.

---

## Running it on your own computer (optional)

You don't need this to use the app — the live link above is always available.
But if you'd like to run it locally:

1. Install [Node.js](https://nodejs.org) (version 20 or newer).
2. Open this folder in a terminal.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open the link the terminal prints (usually http://localhost:5173).

---

## How it's deployed

Every change pushed to the `main` branch is automatically built and published to
the live link above by a GitHub Actions workflow (`.github/workflows/deploy.yml`).

Built with React, Vite, and Recharts.
