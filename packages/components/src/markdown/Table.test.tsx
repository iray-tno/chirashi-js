import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Table, TableCell, TableHead } from './Table';

describe('Table', () => {
  it('renders a table element', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>cell</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('wraps the table in a scrollable section', () => {
    render(
      <Table>
        <tbody />
      </Table>
    );
    const section = screen.getByRole('region', { name: /data table/i });
    expect(section).toBeInTheDocument();
    expect(section.querySelector('table')).toBeInTheDocument();
  });

  it('passes through className to the table', () => {
    render(
      <Table className="extra">
        <tbody />
      </Table>
    );
    expect(screen.getByRole('table')).toHaveClass('extra');
  });
});

describe('TableHead', () => {
  it('renders a thead element', () => {
    render(
      <table>
        <TableHead>
          <tr>
            <th>Header</th>
          </tr>
        </TableHead>
      </table>
    );
    expect(screen.getByText('Header').closest('thead')).toBeInTheDocument();
  });
});

describe('TableCell', () => {
  it('renders as td by default', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Data</TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByRole('cell', { name: 'Data' })).toBeInTheDocument();
  });

  it('renders as th when isHeader is true', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableCell isHeader>Header</TableCell>
          </tr>
        </thead>
      </table>
    );
    expect(
      screen.getByRole('columnheader', { name: 'Header' })
    ).toBeInTheDocument();
  });
});
