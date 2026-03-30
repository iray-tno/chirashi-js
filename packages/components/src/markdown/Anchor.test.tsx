import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Anchor } from './Anchor';

describe('Anchor', () => {
  it('renders an anchor with the given href', () => {
    render(<Anchor href="/about">About</Anchor>);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('does not add target or rel for internal links', () => {
    render(<Anchor href="/about">About</Anchor>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('adds target=_blank and rel=noopener noreferrer for http links', () => {
    render(<Anchor href="http://example.com">External</Anchor>);
    const link = screen.getByRole('link', { name: /external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('adds target=_blank and rel=noopener noreferrer for https links', () => {
    render(<Anchor href="https://example.com">External</Anchor>);
    const link = screen.getByRole('link', { name: /external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the ↗ icon for external links', () => {
    render(<Anchor href="https://example.com">External</Anchor>);
    expect(screen.getByRole('img', { name: /opens in new tab/i })).toBeInTheDocument();
  });

  it('does not render the ↗ icon for internal links', () => {
    render(<Anchor href="/about">About</Anchor>);
    expect(
      screen.queryByRole('img', { name: /opens in new tab/i })
    ).not.toBeInTheDocument();
  });

  it('passes through className', () => {
    render(
      <Anchor href="/about" className="extra">
        About
      </Anchor>
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('extra');
  });
});
