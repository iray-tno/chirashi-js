import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const headingStyles: Record<number, string> = {
  1: 'text-4xl font-bold mt-8 mb-3',
  2: 'text-3xl font-bold mt-8 mb-3',
  3: 'text-2xl font-bold mt-6 mb-3',
  4: 'text-xl font-semibold mt-6 mb-3',
  5: 'text-lg font-semibold mt-4 mb-2',
  6: 'text-base font-semibold mt-4 mb-2',
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
  className,
  ...props
}) => {
  const Tag = `h${level}` as const;
  const headingId = id || slugify(extractText(children));

  return (
    <Tag
      id={headingId}
      className={`group relative leading-tight pl-6 ${headingStyles[level]} ${className || ''}`}
      {...props}
    >
      <a
        href={`#${headingId}`}
        aria-label={`Link to ${extractText(children)}`}
        className="absolute left-0 w-6 no-underline font-normal text-inherit opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus:opacity-100 text-center"
      >
        #
      </a>
      {children}
    </Tag>
  );
};
