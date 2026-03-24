import React from 'react';

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  ...props
}) => {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid #d4d4d8',
        paddingLeft: '1rem',
        margin: '1.5rem 0',
        color: '#52525b',
        fontStyle: 'italic',
      }}
      {...props}
    >
      {children}
    </blockquote>
  );
};
