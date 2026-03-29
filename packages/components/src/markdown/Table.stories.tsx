import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableCell, TableHead } from './Table';

const meta = {
  title: 'Markdown/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Table>
      <TableHead>
        <tr>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Language</TableCell>
          <TableCell isHeader>Stars</TableCell>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <TableCell>Next.js</TableCell>
          <TableCell>TypeScript</TableCell>
          <TableCell>120k</TableCell>
        </tr>
        <tr>
          <TableCell>Remix</TableCell>
          <TableCell>TypeScript</TableCell>
          <TableCell>28k</TableCell>
        </tr>
        <tr>
          <TableCell>Astro</TableCell>
          <TableCell>TypeScript</TableCell>
          <TableCell>42k</TableCell>
        </tr>
      </tbody>
    </Table>
  ),
};

export const WideTable: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Table>
        <TableHead>
          <tr>
            <TableCell isHeader>Column 1</TableCell>
            <TableCell isHeader>Column 2</TableCell>
            <TableCell isHeader>Column 3</TableCell>
            <TableCell isHeader>Column 4</TableCell>
            <TableCell isHeader>Column 5</TableCell>
          </tr>
        </TableHead>
        <tbody>
          <tr>
            <TableCell>Data that is quite long</TableCell>
            <TableCell>More data here</TableCell>
            <TableCell>Even more data</TableCell>
            <TableCell>Still more columns</TableCell>
            <TableCell>Last column</TableCell>
          </tr>
        </tbody>
      </Table>
    </div>
  ),
};
