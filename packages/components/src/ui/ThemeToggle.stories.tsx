import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { type Theme, ThemeToggle } from './ThemeToggle';

const themes: Theme[] = ['light', 'dark', 'system'];

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Current theme',
    },
    onToggle: {
      description: 'Callback when the toggle is clicked',
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
    onToggle: () => {},
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    onToggle: () => {},
  },
};

export const System: Story = {
  args: {
    theme: 'system',
    onToggle: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>('system');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle
          theme={theme}
          onToggle={() => {
            const next = themes[(themes.indexOf(theme) + 1) % themes.length];
            setTheme(next);
          }}
        />
        <span>Current: {theme}</span>
      </div>
    );
  },
  args: {
    theme: 'system',
    onToggle: () => {},
  },
};
