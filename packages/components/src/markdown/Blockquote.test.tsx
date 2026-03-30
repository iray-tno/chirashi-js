import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Blockquote } from './Blockquote';

describe('Blockquote', () => {
  it('renders children inside a blockquote element', () => {
    render(<Blockquote>Quoted text</Blockquote>);
    const el = screen.getByText('Quoted text');
    expect(el.closest('blockquote')).toBeInTheDocument();
  });

  it('passes through className', () => {
    render(<Blockquote className="extra">Quoted text</Blockquote>);
    expect(screen.getByText('Quoted text').closest('blockquote')).toHaveClass(
      'extra'
    );
  });
});
