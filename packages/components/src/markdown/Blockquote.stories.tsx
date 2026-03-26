import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './Blockquote';

const meta = {
  title: 'Markdown/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: <p>This is a simple blockquote with a single paragraph.</p>,
  },
};

export const MultiParagraph: Story = {
  render: () => (
    <Blockquote>
      <p>First paragraph of the quote.</p>
      <p>Second paragraph with additional context and detail.</p>
    </Blockquote>
  ),
};

export const WithAttribution: Story = {
  render: () => (
    <Blockquote>
      <p>The best way to predict the future is to invent it.</p>
      <footer style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
        — Alan Kay
      </footer>
    </Blockquote>
  ),
};
