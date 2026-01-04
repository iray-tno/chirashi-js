import type { Meta, StoryObj } from '@storybook/react';
import { SeriesNav } from './SeriesNav';

const meta = {
  title: 'Article/SeriesNav',
  component: SeriesNav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    series: {
      control: 'text',
      description: 'Name of the article series',
    },
    currentOrder: {
      control: 'number',
      description: 'Order number of the current article in the series',
    },
  },
} satisfies Meta<typeof SeriesNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutPosts: Story = {
  args: {
    series: 'React Fundamentals',
    currentOrder: 1,
  },
};

export const WithPosts: Story = {
  args: {
    series: 'TypeScript Deep Dive',
    currentOrder: 2,
    posts: [
      {
        slug: 'typescript-basics',
        title: 'TypeScript Basics',
        order: 1,
      },
      {
        slug: 'advanced-types',
        title: 'Advanced Types',
        order: 2,
      },
      {
        slug: 'generics-explained',
        title: 'Generics Explained',
        order: 3,
      },
    ],
  },
};

export const LongSeries: Story = {
  args: {
    series: 'Complete Web Development Guide',
    currentOrder: 5,
    posts: [
      { slug: 'html-basics', title: 'HTML Basics', order: 1 },
      { slug: 'css-fundamentals', title: 'CSS Fundamentals', order: 2 },
      { slug: 'javascript-intro', title: 'JavaScript Introduction', order: 3 },
      { slug: 'dom-manipulation', title: 'DOM Manipulation', order: 4 },
      { slug: 'async-javascript', title: 'Async JavaScript', order: 5 },
      { slug: 'react-basics', title: 'React Basics', order: 6 },
      { slug: 'state-management', title: 'State Management', order: 7 },
      { slug: 'api-integration', title: 'API Integration', order: 8 },
    ],
  },
};

export const FirstInSeries: Story = {
  args: {
    series: 'Algorithm Design',
    currentOrder: 1,
    posts: [
      { slug: 'intro-algorithms', title: 'Introduction to Algorithms', order: 1 },
      { slug: 'sorting-algorithms', title: 'Sorting Algorithms', order: 2 },
      { slug: 'graph-algorithms', title: 'Graph Algorithms', order: 3 },
    ],
  },
};

export const LastInSeries: Story = {
  args: {
    series: 'Algorithm Design',
    currentOrder: 3,
    posts: [
      { slug: 'intro-algorithms', title: 'Introduction to Algorithms', order: 1 },
      { slug: 'sorting-algorithms', title: 'Sorting Algorithms', order: 2 },
      { slug: 'graph-algorithms', title: 'Graph Algorithms', order: 3 },
    ],
  },
};
