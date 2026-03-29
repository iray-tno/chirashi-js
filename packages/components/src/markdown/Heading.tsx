import React from 'react';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const fontSizes: Record<number, string> = {
  1: '2rem',
  2: '1.5rem',
  3: '1.25rem',
  4: '1.125rem',
  5: '1rem',
  6: '0.875rem',
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props?.children) {
    return extractText(children.props.children);
  }
  return '';
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  id,
  ...props
}) => {
  const Tag = `h${level}` as const;
  const headingId = id || slugify(extractText(children));

  return (
    <Tag
      id={headingId}
      style={{
        fontSize: fontSizes[level],
        fontWeight: level <= 3 ? 'bold' : '600',
        lineHeight: 1.3,
        marginTop: level <= 2 ? '2rem' : '1.5rem',
        marginBottom: '0.75rem',
        position: 'relative',
      }}
      {...props}
    >
      <a
        href={`#${headingId}`}
        aria-label={`Link to ${extractText(children)}`}
        style={{
          position: 'absolute',
          left: '-1.25em',
          color: 'inherit',
          textDecoration: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          fontWeight: 'normal',
        }}
        className="heading-anchor"
      >
        #
      </a>
      {children}
    </Tag>
  );
};
