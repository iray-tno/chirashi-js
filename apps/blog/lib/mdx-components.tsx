import {
  Anchor,
  Blockquote,
  Heading,
  Table,
  TableCell,
  TableHead,
} from '@chirashi/components/markdown';
import {
  Flashcard,
  FlashcardBack,
  FlashcardFront,
  Visualizer,
} from '@chirashi/components/mdx';
import { MarkdownImage } from '@/components/MarkdownImage';

export const mdxComponents = {
  a: Anchor as any,
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  blockquote: Blockquote as any,
  table: Table as any,
  thead: TableHead as any,
  th: (props: any) => <TableCell isHeader {...props} />,
  td: TableCell as any,
  img: MarkdownImage as any,
  Flashcard: Flashcard as any,
  FlashcardFront: FlashcardFront as any,
  FlashcardBack: FlashcardBack as any,
  Visualizer: Visualizer as any,
};
