import { useMemo, useRef, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { mockData } from './data';
import type { Product } from './data';

const TableVirtualized = () => {
  const columns = useMemo<Array<ColumnDef<Product>>>(() => [
    {
      id: 'name',
      accessorKey: 'name',
      header: () => 'Name',
      cell: info => info.getValue(),
    }
  ], []);

  const [data] = useState(() => mockData(2));

  console.log({ data });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: data.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 30,
    getScrollElement: () => tableContainerRef.current,
  });

  return (
    <Paper ref={tableContainerRef} sx={{ height: '500px' }}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow>
              {headerGroup.headers.map(header => (
                <TableCell component='th' colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rowVirtualizer.getVirtualItems().map((_row, i) => {
            console.log(_row);
            const row = rows[_row.index];

            console.log({ row });

            return (
              <TableRow>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableVirtualized;
