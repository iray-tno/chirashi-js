import React, { useState } from 'react';

export interface FlashcardProps {
  children: React.ReactNode;
}

export interface FlashcardFrontProps {
  children: React.ReactNode;
}

export interface FlashcardBackProps {
  children: React.ReactNode;
}

/**
 * Flashcard Container Component (Placeholder)
 *
 * @example
 * ```tsx
 * <Flashcard>
 *   <FlashcardFront>Question</FlashcardFront>
 *   <FlashcardBack>Answer</FlashcardBack>
 * </Flashcard>
 * ```
 */
export const Flashcard: React.FC<FlashcardProps> = ({ children }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const content = childrenArray[isFlipped ? 1 : 0];

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        padding: '2rem',
        border: '2px solid #333',
        borderRadius: '8px',
        cursor: 'pointer',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isFlipped ? '#f0f0f0' : '#fff',
      }}
    >
      {content}
    </div>
  );
};

export const FlashcardFront: React.FC<FlashcardFrontProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const FlashcardBack: React.FC<FlashcardBackProps> = ({ children }) => {
  return <div>{children}</div>;
};
