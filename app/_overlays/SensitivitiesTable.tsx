'use client'

import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table'
import { sensitivitiesData, formatCurrency } from './data/sensitivitiesData'

const columnHelper = createColumnHelper<typeof sensitivitiesData[0]>()

const columns = [
  columnHelper.accessor('riskFactor', {
    header: 'Risk Factor',
    cell: (info) => (
      <span className="text-gray-100 font-medium">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('shock', {
    header: 'Shock',
    cell: (info) => (
      <span className="text-gray-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('pv01', {
    header: 'PV01',
    cell: (info) => (
      <span className="text-red-400 font-mono">
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('pv10', {
    header: 'PV10',
    cell: (info) => (
      <span className="text-red-400 font-mono">
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('pv100', {
    header: 'PV100',
    cell: (info) => (
      <span className="text-red-400 font-mono">
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('duration', {
    header: 'Duration',
    cell: (info) => (
      <span className="text-gray-300">
        {info.getValue().toFixed(1)}y
      </span>
    ),
  }),
  columnHelper.accessor('convexity', {
    header: 'Convexity',
    cell: (info) => (
      <span className="text-gray-300">
        {info.getValue().toFixed(2)}
      </span>
    ),
  }),
]

export function SensitivitiesTable() {
  const table = useReactTable({
    data: sensitivitiesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-700">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-800/50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
