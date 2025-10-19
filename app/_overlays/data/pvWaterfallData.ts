export interface PVWaterfallItem {
  category: string
  value: number
  cumulative: number
  color: string
}

export const pvWaterfallData: PVWaterfallItem[] = [
  {
    category: 'Base PV',
    value: 1250000,
    cumulative: 1250000,
    color: '#3b82f6'
  },
  {
    category: 'CVA',
    value: -45000,
    cumulative: 1205000,
    color: '#ef4444'
  },
  {
    category: 'DVA',
    value: 12000,
    cumulative: 1217000,
    color: '#10b981'
  },
  {
    category: 'FVA',
    value: -18000,
    cumulative: 1199000,
    color: '#f59e0b'
  },
  {
    category: 'KVA',
    value: -25000,
    cumulative: 1174000,
    color: '#8b5cf6'
  },
  {
    category: 'Total XVA',
    value: -76000,
    cumulative: 1174000,
    color: '#6b7280'
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
