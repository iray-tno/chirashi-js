import React from 'react';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, ...props }) => {
  return (
    <div
      role="region"
      aria-label="Data table"
      tabIndex={0}
      style={{ overflowX: 'auto', margin: '1.5rem 0' }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.875rem',
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  ...props
}) => {
  return (
    <thead
      style={{
        borderBottom: '2px solid #d4d4d8',
      }}
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
  ...props
}) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag
      style={{
        padding: '0.5rem 0.75rem',
        textAlign: 'left',
        borderBottom: '1px solid #e4e4e7',
        ...(isHeader && { fontWeight: 600 }),
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};
