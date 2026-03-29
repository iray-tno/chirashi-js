import type React from 'react';

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <blockquote
      className={`border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 my-6 text-zinc-600 dark:text-zinc-400 italic ${className || ''}`}
      {...props}
    >
      {children}
    </blockquote>
  );
};
