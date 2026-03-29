import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SeriesNav } from './SeriesNav';

describe('SeriesNav', () => {
  it('renders series name', () => {
    render(<SeriesNav series="React Tutorial" />);
    expect(screen.getByText(/React Tutorial/i)).toBeInTheDocument();
  });

  it('displays placeholder when no posts provided', () => {
    render(<SeriesNav series="React Tutorial" currentOrder={1} />);
    expect(
      screen.getByText(/No posts in this series yet/i)
    ).toBeInTheDocument();
  });

  it('renders post list when posts are provided', () => {
    const posts = [
      { slug: 'post-1', title: 'First Post', order: 1 },
      { slug: 'post-2', title: 'Second Post', order: 2 },
    ];
    render(
      <SeriesNav series="React Tutorial" currentOrder={1} posts={posts} />
    );
    expect(screen.getByText(/First Post/)).toBeInTheDocument();
    expect(screen.getByText(/Second Post/)).toBeInTheDocument();
  });
});
