import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta = {
  title: 'Markdown/Image',
  component: Image,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://placehold.co/600x400/e2e8f0/475569?text=Sample+Image',
    alt: 'A sample placeholder image',
  },
};

export const WithCaption: Story = {
  args: {
    src: 'https://placehold.co/600x400/e2e8f0/475569?text=Architecture+Diagram',
    alt: 'System architecture diagram showing the monorepo structure',
    caption: 'Figure 1: Monorepo architecture overview',
  },
};

export const SmallImage: Story = {
  args: {
    src: 'https://placehold.co/200x200/e2e8f0/475569?text=Icon',
    alt: 'A small icon',
    caption: 'Application icon',
  },
};
