export interface SensitivityRow {
  id: string
  riskFactor: string
  shock: string
  pv01: number
  pv10: number
  pv100: number
  duration: number
  convexity: number
}

export const sensitivitiesData: SensitivityRow[] = [
  {
    id: '1',
    riskFactor: 'USD OIS 1Y',
    shock: '+1bp',
    pv01: -1250,
    pv10: -12500,
    pv100: -125000,
    duration: 2.5,
    convexity: 0.15
  },
  {
    id: '2',
    riskFactor: 'USD OIS 5Y',
    shock: '+1bp',
    pv01: -3200,
    pv10: -32000,
    pv100: -320000,
    duration: 4.2,
    convexity: 0.28
  },
  {
    id: '3',
    riskFactor: 'USD OIS 10Y',
    shock: '+1bp',
    pv01: -1800,
    pv10: -18000,
    pv100: -180000,
    duration: 7.8,
    convexity: 0.45
  },
  {
    id: '4',
    riskFactor: 'SOFR 1Y',
    shock: '+1bp',
    pv01: -950,
    pv10: -9500,
    pv100: -95000,
    duration: 1.8,
    convexity: 0.12
  },
  {
    id: '5',
    riskFactor: 'SOFR 5Y',
    shock: '+1bp',
    pv01: -2100,
    pv10: -21000,
    pv100: -210000,
    duration: 3.5,
    convexity: 0.22
  },
  {
    id: '6',
    riskFactor: 'USD/EUR FX',
    shock: '+1%',
    pv01: -8500,
    pv10: -85000,
    pv100: -850000,
    duration: 0.0,
    convexity: 0.0
  },
  {
    id: '7',
    riskFactor: 'Credit Spread',
    shock: '+1bp',
    pv01: -4200,
    pv10: -42000,
    pv100: -420000,
    duration: 5.2,
    convexity: 0.35
  }
]

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
