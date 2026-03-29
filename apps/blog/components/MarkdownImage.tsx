import type React from 'react';
import NextImage from 'next/image';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  className?: string;
}

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  title,
  caption,
  className,
}) => {
  if (!src) return null;

  const img = (
    <NextImage
      src={src}
      alt={alt || ''}
      title={title}
      width={0}
      height={0}
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
