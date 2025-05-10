import React from 'react';
import { Tag } from '@fluentui/react-components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

interface Request {
  id: string;
  title: string;
  deadline: string;
  status: string;
  assignedTo: string;
  createdBy: string;
}

const RequestList = ({ requests }: { requests: Request[] }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columnHelper = createColumnHelper<Request>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <Tag appearance="outline" shape="circular">
          {info.getValue()}
        </Tag>
      ),
    }),
    columnHelper.accessor('assignedTo', {
      header: 'Assigned To',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdBy', {
      header: 'Created By',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: requests || [],
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleRowClick = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    borderBottom: '1px solid #e0e0e0',
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original.id)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {'<'} Prev
        </button>
        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <button
            key={index}
            onClick={() => table.setPageIndex(index)}
            style={{
              background: index === table.getState().pagination.pageIndex ? '#e0e0e0' : 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Next {'>'}
        </button>
      </div>
    </div>
  );
};

export default RequestList;