import { visit } from 'unist-util-visit';

/**
 * The feed.xml pipeline runs plain remark-parse (no remark-mdx), so custom
 * component tags like <Flashcard> aren't parsed as JSX — CommonMark treats
 * them as a raw HTML block, and everything until the next blank line
 * (including any plain text inside) collapses into a single `html` mdast
 * node's value. RSS readers can't execute React components anyway, so
 * strip the known custom tags out of that blob rather than leaking raw
 * JSX-looking markup into the feed.
 */
const TEXT_WRAPPER_TAGS = ['Flashcard', 'FlashcardFront', 'FlashcardBack'];
const VOID_TAGS = ['Visualizer'];

function stripKnownTags(value: string): string {
  let result = value;
  for (const tag of VOID_TAGS) {
    result = result.replace(new RegExp(`<${tag}(\\s[^>]*)?/>`, 'g'), '');
  }
  for (const tag of TEXT_WRAPPER_TAGS) {
    result = result.replace(new RegExp(`</?${tag}(\\s[^>]*)?>`, 'g'), '');
  }
  return result;
}

export default function remarkStripMdxComponents(): (tree: any) => void {
  return (tree) => {
    visit(tree, 'html', (node: any, index, parent) => {
      if (typeof node.value !== 'string' || !parent || index === undefined) {
        return;
      }
      const stripped = stripKnownTags(node.value);
      if (stripped === node.value) return;

      if (stripped.trim() === '') {
        parent.children.splice(index, 1);
        return index;
      }
      node.value = stripped;
    });
  };
}
