import type React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
  width?: number | string;
  height?: number | string;
}

export const Image: React.FC<ImageProps> = ({
  caption,
  alt,
  width,
  height,
  className,
  ...props
}) => {
  const img = (
    <img
      alt={alt || ''}
      width={width}
      height={height}
      loading="lazy"
      className={`max-w-full h-auto rounded-lg block ${className || ''}`}
      {...props}
    />
  );

  if (caption) {
    return (
      <figure className="my-6">
        {img}
        <figcaption className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 text-center">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return img;
};
