import type React from 'react';
import NextImage from 'next/image';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  title,
  caption,
  className,
  width,
  height,
}) => {
  if (!src) return null;

  const hasSize = width && height;
  const imgWidth = hasSize ? Number(width) : 0;
  const imgHeight = hasSize ? Number(height) : 0;

  const img = (
    <NextImage
      src={src}
      alt={alt || ''}
      title={title}
      width={imgWidth}
      height={imgHeight}
      sizes="100vw"
      className={`w-full h-auto rounded-lg ${className || ''}`}
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

  return <div className="my-6">{img}</div>;
};
