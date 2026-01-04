import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TagList } from './TagList';

const meta = {
  title: 'Article/TagList',
  component: TagList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    tags: {
      control: 'object',
      description: 'Array of tag strings to display',
    },
    onTagClick: {
      description: 'Callback function when a tag is clicked',
    },
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tags: ['React', 'TypeScript', 'Web Development'],
  },
};

export const WithClickHandler: Story = {
  args: {
    tags: ['React', 'TypeScript', 'Web Development'],
    onTagClick: fn(),
  },
};

export const ManyTags: Story = {
  args: {
    tags: [
      'React',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'Frontend',
      'CSS',
      'HTML',
      'Node.js',
      'Testing',
      'Performance',
    ],
  },
};

export const SingleTag: Story = {
  args: {
    tags: ['Tutorial'],
  },
};

export const LongTagNames: Story = {
  args: {
    tags: [
      'Advanced TypeScript Techniques',
      'React Performance Optimization',
      'Server-Side Rendering with Next.js',
    ],
  },
};

export const JapaneseTags: Story = {
  args: {
    tags: ['リアクト', 'タイプスクリプト', 'ウェブ開発', 'フロントエンド'],
  },
};
