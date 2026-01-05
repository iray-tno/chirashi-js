import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TagList } from './TagList';

describe('TagList', () => {
  it('renders all tags', () => {
    render(<TagList tags={['React', 'TypeScript', 'Testing']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('calls onTagClick when tag is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<TagList tags={['React']} onTagClick={handleClick} />);

    await user.click(screen.getByText('React'));
    expect(handleClick).toHaveBeenCalledWith('React');
  });
});
