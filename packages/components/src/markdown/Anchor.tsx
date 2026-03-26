import React from 'react';

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith('http://') || href.startsWith('https://');
}

export const Anchor: React.FC<AnchorProps> = ({
  href,
  children,
  ...props
}) => {
  const external = isExternal(href);

  return (
    <a
      href={href}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      style={{
        color: '#2563eb',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      }}
      {...props}
    >
      {children}
      {external && (
        <span
          role="img"
          aria-label="opens in new tab"
          title="opens in new tab"
          style={{
            display: 'inline-block',
            marginLeft: '0.2em',
            fontSize: '0.75em',
            verticalAlign: 'super',
          }}
        >
          ↗
        </span>
      )}
    </a>
  );
};
