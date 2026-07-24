import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import remarkStripMdxComponents from './remark-strip-mdx-components';

async function process(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkStripMdxComponents)
    .use(remarkStringify)
    .process(markdown);
  return String(result).trim();
}

describe('remarkStripMdxComponents', () => {
  it('strips Flashcard/FlashcardFront/FlashcardBack tags but keeps inner text', async () => {
    const input = [
      '<Flashcard>',
      '<FlashcardFront>',
      'Question text',
      '</FlashcardFront>',
      '<FlashcardBack>',
      'Answer text',
      '</FlashcardBack>',
      '</Flashcard>',
    ].join('\n');

    const output = await process(input);

    expect(output).not.toContain('<Flashcard>');
    expect(output).not.toContain('</Flashcard>');
    expect(output).not.toContain('<FlashcardFront>');
    expect(output).not.toContain('<FlashcardBack>');
    expect(output).toContain('Question text');
    expect(output).toContain('Answer text');
  });

  it('drops Visualizer entirely', async () => {
    const input =
      'Before\n\n<Visualizer type="bubble-sort" data={[3,1,2]} />\n\nAfter';

    const output = await process(input);

    expect(output).not.toContain('Visualizer');
    expect(output).toContain('Before');
    expect(output).toContain('After');
  });

  it('leaves ordinary markdown and unrelated HTML untouched', async () => {
    const input = '# Title\n\nSome **bold** text with a <span>span</span>.';

    const output = await process(input);

    expect(output).toContain('<span>span</span>');
    expect(output).toContain('bold');
  });
});
