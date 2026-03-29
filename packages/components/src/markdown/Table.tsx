import type React from 'react';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      aria-label="Data table"
      tabIndex={0}
      className="overflow-x-auto my-6"
    >
      <table
        className={`w-full border-collapse text-sm ${className || ''}`}
        {...props}
      >
        {children}
      </table>
    </section>
  );
};

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead
      className={`border-b-2 border-zinc-300 dark:border-zinc-600 ${className || ''}`}
      {...props}
    >
      {children}
    </thead>
  );
};

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  isHeader?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  ...props
}) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag
      className={`px-3 py-2 text-left border-b border-zinc-200 dark:border-zinc-700 ${isHeader ? 'font-semibold' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
};
