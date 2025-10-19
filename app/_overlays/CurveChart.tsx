'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { curveData } from './data/curveData'

export function CurveChart() {
  // Combine all curve data for the chart
  const combinedData = curveData[0].data.map((point, index) => {
    const combinedPoint: any = { tenor: point.tenor }
    curveData.forEach(curve => {
      combinedPoint[curve.name] = curve.data[index].rate
    })
    return combinedPoint
  })

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="tenor" 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#f9fafb'
            }}
            formatter={(value: number) => [`${value}%`, 'Rate']}
            labelFormatter={(label) => `Tenor: ${label}`}
          />
          <Legend />
          {curveData.map((curve) => (
            <Line
              key={curve.name}
              type="monotone"
              dataKey={curve.name}
              stroke={curve.color}
              strokeWidth={2}
              name={curve.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
