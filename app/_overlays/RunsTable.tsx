'use client'

import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table'
import { runsData, formatCurrency } from './data/runsData'

const columnHelper = createColumnHelper<typeof runsData[0]>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Run Name',
    cell: (info) => (
      <span className="text-gray-100 font-medium">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => (
      <span className="text-gray-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue()
      const statusColors = {
        completed: 'text-green-400 bg-green-400/10',
        running: 'text-yellow-400 bg-yellow-400/10',
        failed: 'text-red-400 bg-red-400/10'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
  }),
  columnHelper.accessor('created', {
    header: 'Created',
    cell: (info) => (
      <span className="text-gray-400 text-sm">
        {new Date(info.getValue()).toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor('pv', {
    header: 'Present Value',
    cell: (info) => {
      const value = info.getValue()
      if (value === 0) return <span className="text-gray-500">-</span>
      return (
        <span className={`font-mono ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatCurrency(value)}
        </span>
      )
    },
  }),
  columnHelper.accessor('duration', {
    header: 'Duration',
    cell: (info) => (
      <span className="text-gray-300 text-sm">
        {info.getValue()}
      </span>
    ),
  }),
]

export function RunsTable() {
  const table = useReactTable({
    data: runsData,
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
