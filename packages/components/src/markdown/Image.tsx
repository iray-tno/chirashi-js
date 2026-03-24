import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
}

export const Image: React.FC<ImageProps> = ({ caption, alt, ...props }) => {
  const img = (
    <img
      alt={alt || ''}
      loading="lazy"
      style={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '0.5rem',
        display: 'block',
      }}
      {...props}
    />
  );

  if (caption) {
    return (
      <figure style={{ margin: '1.5rem 0' }}>
        {img}
        <figcaption
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: '#71717a',
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      </figure>
    );
  }

  return img;
};
