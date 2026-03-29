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
  className,
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
      className={`text-blue-600 underline underline-offset-2 dark:text-blue-400 ${className || ''}`}
      {...props}
    >
      {children}
      {external && (
        <span
          role="img"
          aria-label="opens in new tab"
          title="opens in new tab"
          className="inline-block ml-0.5 text-xs align-super"
        >
          ↗
        </span>
      )}
    </a>
  );
};
