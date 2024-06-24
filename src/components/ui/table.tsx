import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string;
}

const Table = ({ children, className }: TableProps) => {
  return <table className={cn('w-full', className)}>{children}</table>;
};

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

const TableBody = ({ children, className }: TableBodyProps) => {
  return <tbody className={cn('space-y-6', className)}>{children}</tbody>;
};

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

const TableRow = ({ children, className }: TableRowProps) => {
  return <tr className={cn('flex justify-between', className)}>{children}</tr>;
};

interface TableHeadProps extends HTMLAttributes<HTMLTableColElement> {
  className?: string;
}

const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <th className={cn('text-lg font-normal text-left', className)}>
      {children}
    </th>
  );
};

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={cn('flex items-center gap-2 text-lg', className)}>
      {children}
    </td>
  );
};

Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;

export { Table, TableBody, TableRow, TableHead, TableCell };
