export interface RunRow {
  id: string
  name: string
  type: string
  status: 'running' | 'completed' | 'failed'
  created: string
  pv: number
  duration: string
}

export const runsData: RunRow[] = [
  {
    id: '1',
    name: 'IRS 2Y 5% Fixed',
    type: 'Interest Rate Swap',
    status: 'completed',
    created: '2024-01-15 10:30:00',
    pv: 1250000,
    duration: '2.5s'
  },
  {
    id: '2',
    name: 'CCS USD/EUR 5Y',
    type: 'Cross Currency Swap',
    status: 'completed',
    created: '2024-01-15 11:15:00',
    pv: -850000,
    duration: '3.2s'
  },
  {
    id: '3',
    name: 'IRS 10Y 4.5% Fixed',
    type: 'Interest Rate Swap',
    status: 'running',
    created: '2024-01-15 12:00:00',
    pv: 0,
    duration: 'Running...'
  },
  {
    id: '4',
    name: 'XVA Analysis - Portfolio',
    type: 'XVA Analysis',
    status: 'failed',
    created: '2024-01-15 09:45:00',
    pv: 0,
    duration: 'Failed'
  },
  {
    id: '5',
    name: 'IRS 5Y 4.8% Fixed',
    type: 'Interest Rate Swap',
    status: 'completed',
    created: '2024-01-14 16:20:00',
    pv: 2100000,
    duration: '2.8s'
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
