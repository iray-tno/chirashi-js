import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from './Anchor';

const meta = {
  title: 'Markdown/Anchor',
  component: Anchor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InternalLink: Story = {
  args: {
    href: '/posts/example-post',
    children: 'Read more about this topic',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://github.com/iray-tno/chirashi-js',
    children: 'View on GitHub',
  },
};

export const ExternalLinkInParagraph: Story = {
  render: () => (
    <p style={{ maxWidth: '40rem', lineHeight: 1.7 }}>
      This blog is built with <Anchor href="https://nextjs.org">Next.js</Anchor>{' '}
      and uses <Anchor href="https://tailwindcss.com">Tailwind CSS</Anchor> for
      styling. Check the <Anchor href="/docs">documentation</Anchor> for more
      details.
    </p>
  ),
};

export const MailtoLink: Story = {
  args: {
    href: 'mailto:example@example.com',
    children: 'Send email',
  },
};
