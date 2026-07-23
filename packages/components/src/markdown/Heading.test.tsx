import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it.each([1, 2, 3, 4, 5, 6] as const)(
    'renders level %i as the correct HTML tag',
    (level) => {
      render(<Heading level={level}>Title</Heading>);
      expect(
        screen.getByRole('heading', { level, name: /title/i })
      ).toBeInTheDocument();
    }
  );

  it('generates an id by slugifying the text content', () => {
    render(<Heading level={2}>Hello World</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'id',
      'hello-world'
    );
  });

  it('strips non-word characters when slugifying', () => {
    render(<Heading level={2}>C++ & Go!</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'id',
      'c-go'
    );
  });

  it('uses a custom id when provided', () => {
    render(
      <Heading level={2} id="custom-id">
        Title
      </Heading>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'id',
      'custom-id'
    );
  });

  it('renders an anchor link pointing to the heading id', () => {
    render(<Heading level={2}>My Section</Heading>);
    const link = screen.getByRole('link', { name: /link to my section/i });
    expect(link).toHaveAttribute('href', '#my-section');
  });

  it('passes through className', () => {
    render(
      <Heading level={2} className="extra">
        Title
      </Heading>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('extra');
  });
});
