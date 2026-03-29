import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Visualizer } from './Visualizer';

describe('Visualizer', () => {
  it('renders without crashing', () => {
    render(<Visualizer type="bubble-sort" />);
    expect(screen.getByText(/Visualizer Placeholder/i)).toBeInTheDocument();
  });

  it('displays the visualization type', () => {
    render(<Visualizer type="quick-sort" />);
    expect(screen.getByText(/Type: quick-sort/i)).toBeInTheDocument();
  });

  it('displays data when provided', () => {
    render(<Visualizer type="merge-sort" data={[5, 2, 8]} />);
    expect(screen.getByText(/Data: \[5, 2, 8\]/i)).toBeInTheDocument();
  });
});
