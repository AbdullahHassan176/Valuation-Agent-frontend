export interface CurveDataPoint {
  tenor: string
  rate: number
  date: string
}

export interface CurveData {
  name: string
  data: CurveDataPoint[]
  color: string
}

export const curveData: CurveData[] = [
  {
    name: 'USD OIS',
    color: '#3b82f6',
    data: [
      { tenor: '1M', rate: 5.25, date: '2024-01-15' },
      { tenor: '3M', rate: 5.30, date: '2024-03-15' },
      { tenor: '6M', rate: 5.35, date: '2024-06-15' },
      { tenor: '1Y', rate: 5.40, date: '2024-12-15' },
      { tenor: '2Y', rate: 5.45, date: '2025-12-15' },
      { tenor: '5Y', rate: 5.50, date: '2028-12-15' },
      { tenor: '10Y', rate: 5.55, date: '2033-12-15' },
      { tenor: '30Y', rate: 5.60, date: '2053-12-15' }
    ]
  },
  {
    name: 'SOFR',
    color: '#10b981',
    data: [
      { tenor: '1M', rate: 5.20, date: '2024-01-15' },
      { tenor: '3M', rate: 5.25, date: '2024-03-15' },
      { tenor: '6M', rate: 5.30, date: '2024-06-15' },
      { tenor: '1Y', rate: 5.35, date: '2024-12-15' },
      { tenor: '2Y', rate: 5.40, date: '2025-12-15' },
      { tenor: '5Y', rate: 5.45, date: '2028-12-15' },
      { tenor: '10Y', rate: 5.50, date: '2033-12-15' },
      { tenor: '30Y', rate: 5.55, date: '2053-12-15' }
    ]
  },
  {
    name: 'EUR OIS',
    color: '#8b5cf6',
    data: [
      { tenor: '1M', rate: 3.75, date: '2024-01-15' },
      { tenor: '3M', rate: 3.80, date: '2024-03-15' },
      { tenor: '6M', rate: 3.85, date: '2024-06-15' },
      { tenor: '1Y', rate: 3.90, date: '2024-12-15' },
      { tenor: '2Y', rate: 3.95, date: '2025-12-15' },
      { tenor: '5Y', rate: 4.00, date: '2028-12-15' },
      { tenor: '10Y', rate: 4.05, date: '2033-12-15' },
      { tenor: '30Y', rate: 4.10, date: '2053-12-15' }
    ]
  }
]
