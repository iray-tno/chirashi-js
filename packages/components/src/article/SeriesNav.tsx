import React from 'react';

export interface SeriesNavProps {
  series: string;
  currentOrder?: number;
  posts?: Array<{
    slug: string;
    title: string;
    order: number;
  }>;
}

/**
 * Series Navigation Component (Placeholder)
 *
 * Displays navigation for articles in a series.
 *
 * @example
 * ```tsx
 * <SeriesNav
 *   series="React Basics"
 *   currentOrder={2}
 *   posts={[
 *     { slug: 'part-1', title: 'Introduction', order: 1 },
 *     { slug: 'part-2', title: 'Components', order: 2 },
 *   ]}
 * />
 * ```
 */
export const SeriesNav: React.FC<SeriesNavProps> = ({
  series,
  currentOrder,
  posts,
}) => {
  return (
    <nav
      style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '2rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Series: {series}</h3>
      {posts && posts.length > 0 ? (
        <ol>
          {posts.map((post) => (
            <li
              key={post.slug}
              style={{
                fontWeight: post.order === currentOrder ? 'bold' : 'normal',
              }}
            >
              {post.title} {post.order === currentOrder && '(Current)'}
            </li>
          ))}
        </ol>
      ) : (
        <p>
          <em>No posts in this series yet.</em>
        </p>
      )}
    </nav>
  );
};
