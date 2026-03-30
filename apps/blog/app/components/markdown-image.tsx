import NextImage from 'next/image';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
}

export function MarkdownImage({
  src,
  alt,
  title,
  width,
  height,
}: MarkdownImageProps) {
  if (!src) return null;

  const w = Number(width) || 800;
  const h = Number(height) || 600;

  return (
    <NextImage
      src={src}
      alt={alt || ''}
      title={title || undefined}
      width={w}
      height={h}
      className="max-w-full h-auto rounded-lg block"
      sizes="(max-width: 768px) 100vw, 768px"
    />
  );
}
