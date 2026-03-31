import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Markdown/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Main Title',
  },
  decorators: [
    (Story) => (
      <div className="pl-8">
        <Story />
      </div>
    ),
  ],
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'Section Heading',
  },
  decorators: [
    (Story) => (
      <div className="pl-8">
        <Story />
      </div>
    ),
  ],
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'Subsection Heading',
  },
  decorators: [
    (Story) => (
      <div className="pl-8">
        <Story />
      </div>
    ),
  ],
};

export const AllLevels: Story = {
  render: () => (
    <div className="pl-8">
      <Heading level={1}>Heading Level 1</Heading>
      <p>Some paragraph text below the heading.</p>
      <Heading level={2}>Heading Level 2</Heading>
      <p>Some paragraph text below the heading.</p>
      <Heading level={3}>Heading Level 3</Heading>
      <p>Some paragraph text below the heading.</p>
      <Heading level={4}>Heading Level 4</Heading>
      <p>Some paragraph text below the heading.</p>
      <Heading level={5}>Heading Level 5</Heading>
      <p>Some paragraph text below the heading.</p>
      <Heading level={6}>Heading Level 6</Heading>
      <p>Some paragraph text below the heading.</p>
    </div>
  ),
};

export const WithAnchorLink: Story = {
  render: () => (
    <div className="pl-8">
      <Heading level={2}>Hover to See Anchor Link</Heading>
      <p>Hover the heading above to see the # anchor link appear.</p>
    </div>
  ),
};
