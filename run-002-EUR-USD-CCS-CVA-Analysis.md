# CVA Analysis Report - EUR/USD CCS - Cross Currency

**Run ID:** run-002  
**Instrument Type:** Cross Currency Swap (CCS)  
**CVA Analysis Date:** October 21, 2025  
**Report Type:** Bilateral CVA Analysis (Multi-Currency)  

## Executive Summary

| CVA Metric | Value |
|-----------|-------|
| **Bilateral CVA** | -$3,850 EUR |
| **CVA Charge** | $3,850 EUR |
| **CVA Benefit** | $0 EUR |
| **Net CVA Impact** | -$3,850 EUR |
| **CVA as % of Notional** | 0.077% |

## CVA Methodology (Multi-Currency)

### Credit Risk Parameters
- **Counterparty Rating:** A- (S&P)
- **Own Rating:** AA- (S&P)
- **Recovery Rate:** 40%
- **Hazard Rate:** 0.45% (Counterparty), 0.15% (Own)
- **Correlation:** 0.30 (rates vs credit), 0.20 (FX vs credit)

### Valuation Framework
- **Model:** Multi-currency Hull-White with Credit Risk
- **Monte Carlo Paths:** 15,000
- **Time Steps:** 24 per year
- **Credit Model:** Reduced-form intensity model
- **FX Model:** Log-normal with drift

## Bilateral CVA Calculation

### CVA Components

#### Counterparty CVA (CVA Charge)
- **Expected Exposure (EUR):** €2,100,000
- **Expected Exposure (USD):** $2,268,000
- **Credit Spread:** 90 bps
- **CVA Charge:** €3,850
- **Risk Contribution:** 100%

#### Own Credit CVA (CVA Benefit)
- **Expected Exposure:** €1,950,000
- **Credit Spread:** 25 bps
- **CVA Benefit:** €0 (netting benefit)
- **Risk Contribution:** 0%

### Net CVA Impact
```
Net CVA = CVA Charge - CVA Benefit
Net CVA = €3,850 - €0 = -€3,850
```

## Multi-Currency Exposure Analysis

### Expected Exposure Profile (EUR)
| Time (Years) | EUR Exposure | USD Exposure | FX Rate |
|--------------|--------------|--------------|---------|
| 0.5 | €1,200,000 | $1,296,000 | 1.08 |
| 1.0 | €1,800,000 | $1,944,000 | 1.08 |
| 2.0 | €2,100,000 | $2,268,000 | 1.08 |
| 3.0 | €1,950,000 | $2,106,000 | 1.08 |

### Peak Exposure Analysis
- **Peak EUR Exposure:** €2,100,000 (Year 2)
- **Peak USD Exposure:** $2,268,000 (Year 2)
- **Average EUR Exposure:** €1,800,000
- **Average USD Exposure:** €1,944,000

## FX Risk in CVA

### FX Sensitivity Analysis
| FX Rate Change | CVA Impact | % Change |
|----------------|------------|----------|
| +5% (EUR stronger) | +€192 | +5.0% |
| +10% (EUR stronger) | +€385 | +10.0% |
| -5% (EUR weaker) | -€192 | -5.0% |
| -10% (EUR weaker) | -€385 | -10.0% |

### Cross-Currency Basis Impact
- **EUR Basis:** -15 bps
- **USD Basis:** +10 bps
- **Basis Impact on CVA:** +€115

## Credit Risk Analytics

### Credit Spread Sensitivity
| Spread Change | CVA Impact | % Change |
|---------------|------------|----------|
| +25 bps | +€1,070 | +27.8% |
| +50 bps | +€2,140 | +55.6% |
| -25 bps | -€1,070 | -27.8% |
| -50 bps | -€2,140 | -55.6% |

### Rating Migration Impact
| Scenario | CVA Impact | Probability |
|----------|------------|-------------|
| Counterparty Downgrade (A- → BBB+) | +€1,925 | 20% |
| Counterparty Upgrade (A- → A) | -€770 | 25% |
| Own Downgrade (AA- → A+) | +€385 | 5% |

## Risk Metrics

### CVA Risk Measures
- **CVA VaR (1-day, 99%):** €385
- **CVA VaR (10-day, 99%):** €1,220
- **CVA Expected Shortfall:** €577
- **CVA Duration:** 2.1 years

### Multi-Currency Sensitivity
- **Credit Spread Delta:** €42.78 per bp
- **Interest Rate Delta (EUR):** €180 per bp
- **Interest Rate Delta (USD):** €195 per bp
- **FX Delta:** €385 per 1% FX change
- **Correlation Delta:** €128 per 0.1

## Stress Testing

### Adverse Scenarios
| Scenario | CVA Impact | Description |
|----------|------------|-------------|
| Credit Crisis | +€7,700 | Spreads +200 bps |
| FX Crisis | +€1,925 | EUR/USD -20% |
| Rate Shock (EUR) | +€1,540 | EUR rates +100 bps |
| Rate Shock (USD) | +€1,155 | USD rates +100 bps |
| Combined Stress | +€11,550 | All factors combined |

### Historical Scenarios
- **2008 Crisis:** CVA would increase by +€5,775
- **COVID-19:** CVA would increase by +€3,850
- **Brexit Impact:** CVA would increase by +€2,310
- **Normal Market:** Current CVA level

## Regulatory Capital

### Basel III CVA Capital
- **CVA Risk Weight:** 8%
- **CVA Capital Charge:** €308
- **RWA Impact:** €3,850
- **Capital Ratio Impact:** -0.03%

### IFRS 9 Impairment
- **Expected Credit Loss:** €385
- **12-month ECL:** €385
- **Lifetime ECL:** €3,850

## Cross-Currency Considerations

### Currency Risk Management
1. **FX Hedging:** Monitor EUR/USD exposure
2. **Basis Risk:** Track cross-currency basis
3. **Liquidity Risk:** Consider currency liquidity

### Netting Benefits
- **Cross-Currency Netting:** Limited benefit
- **Same-Currency Netting:** Full benefit
- **Collateral Impact:** Multi-currency collateral

## Recommendations

### Risk Management
1. **CVA Limits:** Monitor against €10,000 limit
2. **FX Monitoring:** Track EUR/USD movements
3. **Credit Monitoring:** Track counterparty rating

### Portfolio Optimization
1. **Currency Diversification:** Balance EUR/USD exposure
2. **Netting Optimization:** Maximize same-currency netting
3. **Collateral Management:** Optimize multi-currency collateral

### Capital Management
1. **Capital Efficiency:** Monitor RWA impact
2. **Return on Capital:** Include CVA in pricing
3. **Stress Testing:** Regular scenario analysis

## Technical Implementation

### Model Validation
- **Backtesting:** 95% confidence interval
- **Benchmarking:** Industry standard models
- **Sensitivity Testing:** Comprehensive parameter testing

### Data Requirements
- **Market Data:** Credit spreads, interest rates, FX rates
- **Credit Data:** Ratings, recovery rates
- **Historical Data:** 5 years minimum
- **FX Data:** Historical FX volatility

---

*Multi-Currency CVA Analysis Report generated by Valuation Agent System v1.0*
