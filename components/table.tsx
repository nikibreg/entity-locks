'use client';

import { ReactNode } from 'react';

interface TableProps {
  headers: {displayValue: string, key: string}[];
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {children}
    </tr>
  );
}

export function TableCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      {children}
    </td>
  );
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map(({ displayValue }, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {displayValue}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {rows?.map((row, index) => (
            <TableRow key={index}>
              {headers.map(({ key }, cellIndex) => (
                <TableCell key={cellIndex}>
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
