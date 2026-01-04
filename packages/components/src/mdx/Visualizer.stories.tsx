import type { Meta, StoryObj } from '@storybook/react';
import { Visualizer } from './Visualizer';

const meta = {
  title: 'MDX/Visualizer',
  component: Visualizer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bubble-sort', 'quick-sort', 'merge-sort', 'binary-tree'],
      description: 'The type of algorithm visualization to display',
    },
    data: {
      control: 'object',
      description: 'Array of numbers to visualize',
    },
    speed: {
      control: 'number',
      description: 'Animation speed in milliseconds',
    },
  },
} satisfies Meta<typeof Visualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BubbleSort: Story = {
  args: {
    type: 'bubble-sort',
    data: [5, 2, 8, 1, 9],
    speed: 500,
  },
};

export const QuickSort: Story = {
  args: {
    type: 'quick-sort',
    data: [3, 7, 1, 4, 6, 2, 8],
    speed: 300,
  },
};

export const MergeSort: Story = {
  args: {
    type: 'merge-sort',
    data: [9, 3, 5, 1, 7],
    speed: 400,
  },
};

export const BinaryTree: Story = {
  args: {
    type: 'binary-tree',
    data: [5, 3, 7, 1, 4, 6, 9],
  },
};

export const NoData: Story = {
  args: {
    type: 'bubble-sort',
  },
};
