import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Flashcard, FlashcardFront, FlashcardBack } from './Flashcard';

describe('Flashcard', () => {
  it('renders front content by default', () => {
    render(
      <Flashcard>
        <FlashcardFront>Front content</FlashcardFront>
        <FlashcardBack>Back content</FlashcardBack>
      </Flashcard>
    );
    expect(screen.getByText('Front content')).toBeInTheDocument();
    expect(screen.queryByText('Back content')).not.toBeInTheDocument();
  });

  it('flips to back content on click', async () => {
    const user = userEvent.setup();
    render(
      <Flashcard>
        <FlashcardFront>Front content</FlashcardFront>
        <FlashcardBack>Back content</FlashcardBack>
      </Flashcard>
    );

    const card = screen.getByText('Front content').parentElement;
    if (card) {
      await user.click(card);
      expect(screen.getByText('Back content')).toBeInTheDocument();
      expect(screen.queryByText('Front content')).not.toBeInTheDocument();
    }
  });
});
