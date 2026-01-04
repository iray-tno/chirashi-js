import type { Meta, StoryObj } from '@storybook/react';
import { Flashcard, FlashcardBack, FlashcardFront } from './Flashcard';

const meta = {
  title: 'MDX/Flashcard',
  component: Flashcard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flashcard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Flashcard>
      <FlashcardFront>
        <h3>What is React?</h3>
      </FlashcardFront>
      <FlashcardBack>
        <p>React is a JavaScript library for building user interfaces.</p>
      </FlashcardBack>
    </Flashcard>
  ),
};

export const CodeExample: Story = {
  render: () => (
    <Flashcard>
      <FlashcardFront>
        <h3>What is a React Hook?</h3>
      </FlashcardFront>
      <FlashcardBack>
        <p>
          Hooks are functions that let you "hook into" React state and lifecycle
          features from function components.
        </p>
        <pre>
          <code>const [state, setState] = useState(initialState);</code>
        </pre>
      </FlashcardBack>
    </Flashcard>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Flashcard>
      <FlashcardFront>
        <h3>What are the main features of TypeScript?</h3>
      </FlashcardFront>
      <FlashcardBack>
        <ul>
          <li>Static type checking</li>
          <li>Type inference</li>
          <li>Interface definitions</li>
          <li>Generics</li>
          <li>Enums</li>
          <li>Advanced types (union, intersection, etc.)</li>
          <li>Better IDE support and autocomplete</li>
        </ul>
      </FlashcardBack>
    </Flashcard>
  ),
};
