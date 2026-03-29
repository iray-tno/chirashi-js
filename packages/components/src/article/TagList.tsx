import type React from 'react';

export interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

/**
 * Tag List Component (Placeholder)
 *
 * Displays a list of tags for an article.
 *
 * @example
 * ```tsx
 * <TagList tags={['React', 'TypeScript', 'Web Development']} />
 * ```
 */
export const TagList: React.FC<TagListProps> = ({ tags, onTagClick }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagClick?.(tag)}
          style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#e0e0e0',
            borderRadius: '12px',
            fontSize: '0.875rem',
            cursor: onTagClick ? 'pointer' : 'default',
            border: 'none',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
